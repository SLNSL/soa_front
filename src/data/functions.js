export function clear() {
    setShowModal(false)
    clearErrors()
}

export function clearErrors() {
    setIsNameValid(true)
    setIsCoordXValid(true)
    setIsCoordYValid(true)
    setIsNumberPartsValid(true)
    setIsDateValid(true)
    setIsGenreValid(true)
    setIsAlbumNameValid(true)
    setIsTrackNumberValid(true)
    setIsLengthValid(true)
    setIsSalesValid(true)
}

