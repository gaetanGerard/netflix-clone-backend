export const union = `
    """ Union between MoviesDiscover and TVDiscover """
    union DiscoverResultUnion = MoviesDiscover | TVDiscover
    """ Union between Discover and ResultWithDate """
    union ResultUnion = Discover | ResultWithDate
    """ Union between MovieCertifications and TVCertifications """
    union CertificationsUnion = MovieCertifications | TVCertifications
    """ Union between Cast and PeopleCastMovie/TV and Combined """
    union CastUnion = Cast | PeopleCastMovie | PeopleCastTV
    """ Union between Crew and PeopleCrew Movie/TV and Combined """
    union CrewUnion = Crew | PeopleCrewMovie | PeopleCrewTV
    """ Union between TVDiscover and MovieDisover for TrendingPeople """
    union TVMovieUnion = TVDiscover | MoviesDiscover
    """ Union between TVDiscover and MovieDisover and TrendingPeople for TrendingUnion """
    union TrendingUnion = TVDiscover | MoviesDiscover | TrendingPeople
`;