const routes = {
    // Page public
    explore: '/',
    library: '/library',
    binChart: '/bin-chart',
    radio: '/radio',
    ratingNewMusic: '/rating-new-music',
    topicAndCategory: '/topic-and-category',
    top100: '/top-100',
    page404: '*',

    // Page need login
    createPlaylist: '/create-playlist',
    createPlaylistAi: '/create-playlist-ai',
    playlistDetail: '/playlist/:playlistId',

    // Page: id
    albumDetail: '/album/:albumId',

    // Page admin
    musicAdmin: '/admin/music',
    musicAdminCreate: '/admin/music/create',
    albumAdmin: '/admin/album',
    albumAdminCreate: '/admin/album/create',
    categoryAlbumAdmin: '/admin/album-category',
    artist: '/admin/artist',
};

export default routes;
