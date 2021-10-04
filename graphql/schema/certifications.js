export const certifications = `
    """ Schema for a Certification model """
    type Certification {
        certification: String!
        meaning: String!
        order: Int!
    }

    """ Schema for movie Certifications """
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

    """ Schema for tv Certifications """
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

    """ Schema for TV and Movies Certifications """
    type Certifications {
        certifications: CertificationsUnion
    }
`;