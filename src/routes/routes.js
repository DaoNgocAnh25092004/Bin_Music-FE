//  Desc: Routes configuration file
import config from '~/config';

// Layouts
import { EmptyLayout } from '~/Layouts';
import { AdminLayout } from '~/Layouts';

// Page
import Explore from '~/pages/Explore';
import Library from '~/pages/Library';
import BinChart from '~/pages/BinChart';
import Radio from '~/pages/Radio';
import RatingNewMusic from '~/pages/RatingNewMusic';
import TopicAndCategory from '~/pages/TopicAndCategory';
import Top100 from '~/pages/Top100';
import Page404 from '~/pages/Page404';
import CreatePlaylist from '~/pages/CreatePlaylist';

// Page: id
import AlbumDetail from '~/pages/AlbumDetail';

// Page admin
import MusicAdmin from '~/pages/MusicAdmin';
import MusicAdminCreate from '~/pages/MusicAdminCreate';

import AlbumAdmin from '~/pages/AlbumAdmin';
import AlbumAdminCreate from '~/pages/AlbumAdminCreate';
import CategoryAlbumAdmin from '~/pages/CategoryAlbumAdmin';

import Artist from '~/pages/Artist';

// Routes public
const publicRoutes = [
    {
        path: config.routes.explore,
        component: Explore,
    },

    {
        path: config.routes.binChart,
        component: BinChart,
    },

    { path: config.routes.radio, component: Radio },

    {
        path: config.routes.ratingNewMusic,
        component: RatingNewMusic,
    },

    {
        path: config.routes.topicAndCategory,
        component: TopicAndCategory,
    },

    { path: config.routes.top100, component: Top100 },

    {
        path: config.routes.page404,
        component: Page404,
        layout: EmptyLayout,
    },

    {
        path: config.routes.albumDetail,
        component: AlbumDetail,
    },
];

// Routes private
const protectedRoutes = {
    user: [],
    admin: [
        {
            path: config.routes.musicAdmin,
            component: MusicAdmin,
            layout: AdminLayout,
        },

        {
            path: config.routes.musicAdminCreate,
            component: MusicAdminCreate,
            layout: AdminLayout,
        },

        {
            path: config.routes.albumAdmin,
            component: AlbumAdmin,
            layout: AdminLayout,
        },

        {
            path: config.routes.albumAdminCreate,
            component: AlbumAdminCreate,
            layout: AdminLayout,
        },

        {
            path: config.routes.artist,
            component: Artist,
            layout: AdminLayout,
        },
        {
            path: config.routes.categoryAlbumAdmin,
            component: CategoryAlbumAdmin,
            layout: AdminLayout,
        },
    ],
    both: [
        {
            path: config.routes.library,
            component: Library,
        },

        {
            path: config.routes.createNewPlaylist,
            component: CreatePlaylist,
        },
    ],
};

export { publicRoutes, protectedRoutes };
