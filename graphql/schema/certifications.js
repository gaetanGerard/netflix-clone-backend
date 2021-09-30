export const certifications = `
    """ Type Certification """
    type Certification {
        certification: String!
        meaning: String!
        order: Int!
    }

    type MovieCertifications {
        US: [Certification!]!
        CA: [Certification!]!
        DE: [Certification!]!
        GB: [Certification!]!
        AU: [Certification!]!
        BR: [Certification!]!
        FR: [Certification!]!
        NZ: [Certification!]!
        IN: [Certification!]!
    }

    type TVCertifications {
        US: [Certification!]!
        CA: [Certification!]!
        AU: [Certification!]!
        FR: [Certification!]!
        RU: [Certification!]!
        DE: [Certification!]!
        TH: [Certification!]!
        KR: [Certification!]!
        GB: [Certification!]!
        BR: [Certification!]!
    }

    type MovieCert {
        certifications: MovieCertifications
    }

    type TVCert {
        certifications: TVCertifications
    }
`;