

export const userformatter = (user: any) => {
    const ruser = {
        _id: user._id ? user._id : null,
        firstname: user.firstname ? user.firstname : null,
        lastname: user.lastname ? user.lastname : null,
        username: user.username ? user.username : null,
        email: user.email ? user.email : null,
        mobile: user.mobile ? user.mobile : null,
        gender: user.gender ? user.gender : null,
        dob: user.dob ? user.dob : null,
        country: user.country ? user.country : null,
        role: user.role ? user.role : null,
        terms_conditions: user.terms_conditions ? user.terms_conditions : null,
        provider: user.provider ? user.provider : null,
        photo_url: user.photo_url ? user.photo_url : null,
        uid: user.uid ? user.uid : null,
        email_verified: user.email_verified,
        preferred_genres: user.preferred_genres ? user.preferred_genres : [],
        active: user.active,
        cdate: user.cdate ? user.cdate : null,
        udate: user.udate ? user.udate : null,
    }
    return ruser
}