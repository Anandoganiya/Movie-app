const useGenre = (seletecdGenre) =>{
    if(seletecdGenre.length < 1) return "";
    const genreIds = seletecdGenre.map(g=> g.id);
    return genreIds.toString(); 
}
export default useGenre;