export const networks = `
    """ Schema for Networks """
    type Network {
        headquarters: String
        homepage: String
        id: ID!
        logo_path: String
        name: String!
        origin_country: String!
    }
`;