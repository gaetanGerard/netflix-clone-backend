export const union = `
    """ Union between MoviesDiscover and TVDiscover """
    union DiscoverResultUnion = MoviesDiscover | TVDiscover
    """ Union between Discover and ResultWithDate """
    union ResultUnion = Discover | ResultWithDate
    """ Union between MovieCertifications and TVCertifications """
    union CertificationsUnion = MovieCertifications | TVCertifications
`;