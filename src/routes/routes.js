//  Desc: Routes configuration file
import config from '~/config';

// Layouts
// import { HeaderOnly } from '~/Layouts';

// Pages
import Explore from '~/pages/Explore';
import Library from '~/pages/Library';
import BinChart from '~/pages/BinChart';
import Radio from '~/pages/Radio';
import RatingNewMusic from '~/pages/RatingNewMusic';
import TopicAndCategory from '~/pages/TopicAndCategory';
import Top100 from '~/pages/Top100';

// Routes public
const publicRoutes = [
    {
        path: config.routes.explore,
        component: Explore,
    },

    {
        path: config.routes.library,
        component: Library,
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
];

// Routes private
const privateRoutes = [];

export { publicRoutes, privateRoutes };
