import { MongoDataSource } from 'apollo-datasource-mongodb';
import isEmail from 'isemail';
import bcrypt from 'bcrypt';

export class Users extends MongoDataSource {
    /**
     *  Function to get an User from the context (required to be logged in)
     * @returns return object User
    */
    getUser() {
        if (this.context && this.context.user) {
            return this.context.user;
        }
    }

    /**
     *  Function to get an User with its email
     * @param {emailArgs} arguments Required email of the user
     * @returns return object User
    */
    async findOneByEmailAndPassword(emailArgs) {
        const email = this.context && this.context.user ? this.context.user : emailArgs;
        if (!email && !isEmail.validate(email)) return null;
        const users = await this.findByFields({ email });
        return users && users[0] ? users[0] : null;
    }

    /**
     *  Function to register an User and logged him in
     * @param {data} arguments Required object to store in DB
     * @returns return object User
    */
    async insertNewUser(data) {
        const newUser = await this.collection.insertOne(data);
        const user = await this.collection.findOne({email: data.email});
        return user;
    }


}