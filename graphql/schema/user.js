export const user = `
    """ User Type """
    type User {
        id: ID!
        email: String!
        phone: Int!
        password: String!
        plansDetail: String!
        memberSince: String!
        profiles: [Profile!]!
    }

    """ Profile Type """
    type Profile {
        id: ID!
        profileName: String!
        language: String!
        viewingRestrictions: String!
        profileLock: Boolean
    }

`;