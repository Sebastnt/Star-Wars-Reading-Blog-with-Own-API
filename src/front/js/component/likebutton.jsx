

export const LikeButton = ( i, favorites ) => {
    if ( favorites.find( (character) => character.id === i)) {
        return <button className="like btn btn-outline-warning"><i className="far fa-heart" disabled ></i></button>
    } else {
        return <button className="like btn btn-outline-warning"><i className="far fa-heart" ></i></button>
    }
}