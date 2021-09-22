export const creator = `
    """ Creator Type """
    type Creator implements Person {
        id: ID!
        name: String!
        series: [Media!]!
    }
`;