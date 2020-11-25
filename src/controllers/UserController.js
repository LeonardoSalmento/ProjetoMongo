import User from '../models/User';

class UserController {
    async index(req, res){
        const users = await User.find();
        return res.json(users);

    }

    async show(req,res) {
        const {id} = req.params;
        const user = await User.findOne(id);

        if(!user) {
            return res.status(401).json({error: "Usuário não encontrado"});
        }
        return res.json(user);
    }

    async create(req, res){
        const { firstName, lastName, email } = req.body;
        const created = new Date();
        const updated = new Date();

        if(!email) {
            return res.status(401).json({error: "Digite um email válido"});
        }

        let user = await User.findOne({email});

        if(!user) {
            user = await User.create({firstName, lastName, email, created, updated});
            return res.json(user);
        } else {
            return res.status(401).json({error: "Email Já cadastrado!"});
        } 

    }


    async delete(req, res) {
        const { id } = req.params;

        try{
            const user = await User.findByIdAndDelete(id);
            return res.json({ message: 'Excluída com sucesso' });

        }catch(err){
            return res.status(400).json({ message: err });

        }
      }

}

export default UserController;