const { User, Rent, Field, Category, Booking } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const midtransClient = require('midtrans-client');
const { where } = require('sequelize');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

class Controller {
    static async register(req, res, next) {
        try {
            const user = await User.create(req.body)
            res.status(201).json({ user: user.username, email: user.email })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            // console.log(req.body, "ini login");
            const { email, password } = req.body
            if (!email) throw { message: 'InvalidLogin', field: 'email' }
            if (!password) throw { message: 'InvalidLogin', field: 'password' }
            
            const user = await User.findOne({ where: { email } })
            if (!user) throw { message: 'unauthorized' }
            
            const checkPass = comparePassword(password, user.password)
            if (!checkPass) throw { name: "unauthorized" }
            
            const payload = { id: user.id }
            
            const access_token  = signToken(payload)
            
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
            console.log(error, "<< controller");
        }
    }

    static async googleLogin(req, res, next){
        try {
            // console.log("google log");
            const { google_token } = req.headers
            // console.log(googleToken,"<<<<<<<<<");
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: "706095064565-p8fbhoc2gprsdtb2s6jern58happfcrp.apps.googleusercontent.com",  
            });
            const payload = ticket.getPayload();
            // console.log(payload, "<<<<<");
            
            const [ user, created ] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: String(Math.random() * 10000),
                }
            })

            const access_token = signToken({id: user.id, email: user.email})

            res.status(200).json({access_token})

        } catch (error) {
            next(error)
        }
    }

    static async field(req, res, next) {
        try {
            let data = await Field.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

    static async fieldId(req, res, next) {
        try {
            req.params.id
            let data = await Field.findByPk(req.params.id, { include: Category })
            if (!data) throw { message: "NotFound" }
            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

    static async booked(req, res, next) {
        try {
            let {title, duration, startTime, endTime} = req.body
            const UserId = req.user.id
            // const FieldId = req.params.id
            // console.log(FieldId,'<<<<<<<<<<');
            const FieldId=req.params.id

            let data = await Rent.create({title, FieldId, duration, startTime, endTime, UserId})

            let {price} = await Field.findByPk(FieldId)


            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: "SB-Mid-server-VigLDmwcJmwPKj9fZjpa02Q-"
            });
            const bookingId = `Booking_${data.id}_${process.env.NODE_ENV}`
            const amount = data.duration*price
            let parameter = {
                transaction_details: {
                    order_id: bookingId,
                    gross_amount: amount
                },
                credit_card: {
                    secure: true
                },
                customer_details: {
                    username: req.user.username,
                }
            };
           const midtransToken = await snap.createTransaction(parameter)
           let transactionToken = midtransToken.token
           let transactionTokenUrl = midtransToken.redirect_url

           await Booking.create({
            bookingId,
            amount,
            UserId
           })

            console.log(midtransToken);
            // res.status(201).json(midtransToken)
            res.status(200).json({message: 'Booking Created', transactionToken, transactionTokenUrl, bookingId})
        } catch (error) {
            next(error)
            console.log();
        }
    }
    
    static async bookeduser(req, res, next) {
        try {
            const UserId = req.user.id
            // console.log(UserId,'<<<<<<<<<<');

            let data = await Rent.findOne({where:{UserId:UserId}})

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log();
        }
    }

    static async bookStatus(req, res, next) {
        try {
            await Rent.update(
                { status: true },
                {
                    where: {
                        UserId: req.user.id
                    }
                }
            )
            res.status(200).json({ message: `booked ${req.user.username} done` })
        } catch (error) {

        }
    }

    static async myBook(req, res, next){
        try {
            const data = await Rent.findAll({where: {UserId:req.user.id}})
            // console.log(data,'<<<<<<<<<<<');
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async payment(req, res, next) {
        try {
          const { bookingId } = req.body;
          const booking = await Booking.findOne({ where: { bookingId } });
    
          if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
          }
    
          if (booking.isPay === true) {
            return res.status(400).json({ message: "Booking alreay paid" });
          }
    
          const serverKey = "SB-Mid-server-VigLDmwcJmwPKj9fZjpa02Q-";
          const base64server = Buffer.from(serverKey + ":").toString("base64");
          const response = await axios.get(
            `https://api.sandbox.midtrans.com/v2/${bookingId}/status`,
            {
              headers: {
                Authorization: `Basic ${base64server}`,
              },
            }
          );
    
          if (
            response.data.transaction_status === "settlement" &&
            response.data.status_code === "200"
          ) {
            await Rent.update({ status: true });
            res.json({ message: `Thank you for your payment` });
          } else {
            res.status(400).json({ message: `Please check your payment detail` });
          }
        } catch (error) {
          next(error);
        }
      }
}

module.exports = Controller