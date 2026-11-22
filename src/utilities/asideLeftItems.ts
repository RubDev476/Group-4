import { 
    SportsEsportsOutlined,
    SportsEsports,
    SportsBaseball,
    SportsBaseballOutlined,
    Business,
    Tv,
    Star,
    StarOutline,
    Pets,
    Face3,
    Face3Outlined,
    ColorLens,
    ColorLensOutlined,
    DirectionsCar,
    DirectionsCarOutlined,
    AutoAwesome,
    AutoAwesomeOutlined,
    Diversity3,
    AccountBalance,
    AccountBalanceOutlined,
    Checkroom,
    Restaurant,
    AutoStories,
    AutoStoriesOutlined,
    Skateboarding,
    Gavel,
    School,
    SchoolOutlined,
    TheatersOutlined,
    LibraryMusic,
    LibraryMusicOutlined,
    Place,
    PlaceOutlined,
    SettingsInputAntenna,
    HowToVote,
    HowToVoteOutlined,
    Terminal,
    LocalLibrary,
    LocalLibraryOutlined,
    Church,
    ChurchOutlined,
    Science,
    ScienceOutlined,
    Smartphone,
} from "@mui/icons-material";

import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface TopicIcon {
    title: string;
    slug: string;
    path: string;
    icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {muiName: string;};
    iconPath?: OverridableComponent<SvgIconTypeMap<object, "svg">> & {muiName: string;};
}

export const topicIcons: TopicIcon[] = [
    {title: 'Video games', slug: 'videogames', path: '/topic/videogames', icon: SportsEsportsOutlined, iconPath: SportsEsports},
    {title: 'Sports', slug: 'sports', path: '/topic/sports', icon: SportsBaseballOutlined, iconPath: SportsBaseball},
    {title: 'Business', slug: 'business', path: '/topic/business', icon: Business},
    {title: 'TV', slug: 'tv', path: '/topic/tv', icon: Tv},
    {title: 'Famous', slug: 'famous', path: '/topic/famous', icon: StarOutline, iconPath: Star},
    {title: 'Animals / Pets', slug: 'animals-pets', path: '/topic/animals-pets', icon: Pets},
    {title: 'Anime / Animation', slug: 'anime-animation', path: '/topic/anime-animation', icon: Face3Outlined, iconPath: Face3},
    {title: 'Art', slug: 'art', path: '/topic/art', icon: ColorLensOutlined, iconPath: ColorLens},
    {title: 'Cars / Motors / Vehicles', slug: 'vehicles', path: '/topic/vehicles', icon: DirectionsCarOutlined, iconPath: DirectionsCar},
    {title: 'Crafts', slug: 'crafts', path: '/topic/crafts', icon: AutoAwesomeOutlined, iconPath: AutoAwesome},
    {title: 'Culture / Races / Ethnicities', slug: 'culture', path: '/topic/culture', icon: Diversity3},
    {title: 'Ethics / Philosophy', slug: 'ethics-philosophy', path: '/topic/ethics-philosophy', icon: AccountBalanceOutlined, iconPath: AccountBalance},
    {title: 'Fashion', slug: 'fashion', path: '/topic/fashion', icon: Checkroom},
    {title: 'Meals / Drinks', slug: 'meals-drinks', path: '/topic/meals-drinks', icon: Restaurant},
    {title: 'History', slug: 'history', path: '/topic/history', icon: AutoStoriesOutlined, iconPath: AutoStories},
    {title: 'Hobbies', slug: 'hobbies', path: '/topic/hobbies', icon: Skateboarding},
    {title: 'Law', slug: 'law', path: '/topic/law', icon: Gavel},
    {title: 'Learning / Education', slug: 'education', path: '/topic/education', icon: SchoolOutlined, iconPath: School},
    {title: 'Movies', slug: 'movies', path: '/topic/movies', icon: TheatersOutlined},
    {title: 'Music', slug: 'music', path: '/topic/music', icon: LibraryMusicOutlined, iconPath: LibraryMusic},
    {title: 'Places', slug: 'places', path: '/topic/places', icon: PlaceOutlined, iconPath: Place},
    {title: 'Podcast / Streaming', slug: 'podcast-streaming', path: '/topic/podcast-streaming', icon: SettingsInputAntenna},
    {title: 'Politics', slug: 'politics', path: '/topic/politics', icon: HowToVoteOutlined, iconPath: HowToVote},
    {title: 'Programming', slug: 'programming', path: '/topic/programming', icon: Terminal},
    {title: 'Literature', slug: 'literature', path: '/topic/literature', icon: LocalLibraryOutlined, iconPath: LocalLibrary},
    {title: 'Religion / Spirituality', slug: 'religion-spirituality', path: '/topic/religion-spirituality', icon: ChurchOutlined, iconPath: Church},
    {title: 'Science', slug: 'science', path: '/topic/science', icon: ScienceOutlined, iconPath: Science},
    {title: 'Technology', slug: 'tech', path: '/topic/tech', icon: Smartphone},
];

export const findTopicBySlug = (slug: string): TopicIcon | undefined =>
    topicIcons.find((topic) => topic.slug === slug);
