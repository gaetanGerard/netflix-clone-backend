import { MongoDataSource } from 'apollo-datasource-mongodb';
import isEmail from 'isemail';

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
        const email = this.context && this.context.user ? this.context.user.email : emailArgs;
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

    /**
     *  Function to update an User
     * @param {data} arguments Required object to store in DB
     * @returns return object User
    */
    async updateUser(data) {
        const userId = this.context && this.context.user ? this.context.user._id : null;
        await this.collection.updateOne({_id: userId}, { $set: data });
        const user = await this.collection.findOne(userId);
        return user;
    }

    /**
     *  Function to remove an User
     * @param {data} arguments Required object to store in DB
     * @returns return object User
    */
    async removeUser(data) {
        const userId = this.context && this.context.user ? this.context.user._id : null;
        const newUser = await this.collection.deleteOne({_id: userId});
        let message = {};
        if(newUser.acknowledged === true && newUser.deletedCount === 1) {
            message.msg = "User deleted";
            message.type = "success";
            return message;
        } else {
            message.msg = "An error occurred, try again!";
            message.msg = "error";
            return message;
        }
    }

    /**
     * Function to update an User profile
     * @param {data} arguments Required object to store in DB
     * @returns return object User
     *  */
    async updateUserProfileList(data) {
        const userId = this.context && this.context.user ? this.context.user._id : null;
        const user = await this.collection.findOne(userId);
        const profile = await user.profiles.find(profile => profile.p_name === data.p_name);
        if(profile) {
            const index = await user.profiles.indexOf(profile);
            user.profiles[index] = data;
        } else {
            user.profiles.push(data);
        }
        await this.collection.updateOne({_id: userId}, { $set: user });
        return user.profiles;
    }

    /**
     *  Function to get an User profile
     * @param {p_name} arguments Required object to store in DB
     * @returns return object User
     * */
    async updateProfile(p_name, data) {
        const userId = this.context && this.context.user ? this.context.user._id : null;
        const user = await this.collection.findOne(userId);
        const profile = await user.profiles.find(profile => profile.p_name === p_name);
        if(profile) {
            const index = await user.profiles.indexOf(profile);
            user.profiles[index] = data;
        } else {
            user.profiles.push(data);
        }
        await this.collection.updateOne({_id: userId}, { $set: user });
        return user.profiles;
    }

    /**
     * Function to remove an User profile
     * @param {data} arguments Required object to store in DB
     * @returns return object User
     * */
    async removeProfile(data) {
        const userId = this.context && this.context.user ? this.context.user._id : null;
        const user = await this.collection.findOne(userId);
        const profile = await user.profiles.find(profile => profile.p_name === data);
        if(profile) {
            const index = await user.profiles.indexOf(profile);
            user.profiles.splice(index, 1);
            await this.collection.updateOne({_id: userId}, { $set: user });
            let message = {};
            message.msg = "Profile deleted";
            message.type = "success";
            return message;
        }
    }

    /**
     * Function to add movie/tv to an User profile
     * @param {p_name} arguments Required object to store in DB
     * @param {data} arguments Required object to store in DB
     * @returns return object User
     * */
    async addMovieTVToProfile(p_name, data) {
        const userId = this.context && this.context.user ? this.context.user._id : null;
        const user = await this.collection.findOne(userId);
        const profile = await user.profiles.find(profile => profile.p_name === p_name);
        // check if item is already in the list
        const item = await profile.my_list.find(item => item.id === data.id);
        if(item) {
            let message = {};
            message.msg = "Item already in the list";
            message.type = "error";
            throw new Error(message.msg);
        }
        profile.my_list.push(data);
        await this.collection.updateOne({_id: userId}, { $set: user });
        return data;
    }

    /**
     * Function to remove movie/tv from an User profile
     * @param {p_name} arguments Required object to store in DB
     * @param {data} arguments Required object to store in DB
     * @returns return object User
     * */
    async removeMovieTVFromProfile(p_name, data) {
        const userId = this.context && this.context.user ? this.context.user._id : null;
        const user = await this.collection.findOne(userId);
        const profile = await user.profiles.find(profile => profile.p_name === p_name);
        const item = await profile.my_list.find(item => item.id === data.id);
        if(item) {
            // remove item from the list
            const index = await profile.my_list.indexOf(item);
            profile.my_list.splice(index, 1);
            await this.collection.updateOne({_id: userId}, { $set: user });
            let message = {};
            message.msg = "Item removed from the list";
            message.type = "success";
            return message;
        } else {
            let message = {};
            message.msg = "Item not in your list";
            message.type = "error";
            return message;
        }
    }






}