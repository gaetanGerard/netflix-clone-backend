import { MongoDataSource } from 'apollo-datasource-mongodb';
import isEmail from 'isemail';

const MINUTE = 300;

export class Users extends MongoDataSource {
    /**
     *  Function to get an User
     * @param {userId} arguments Required id of the user you are looking for
     * @returns return object User
    */
    getUser(userId) {
        if (this.context && this.context.user) {
            return this.context.user;
        }
    }

    async findOneByEmailAndPassword(emailArgs) {
        const email = this.context && this.context.user ? this.context.user : emailArgs;
        if (!email && !isEmail.validate(email)) return null;
        const users = await this.findByFields({ email }, { ttl: MINUTE });
        return users && users[0] ? users[0] : null;
    }


}