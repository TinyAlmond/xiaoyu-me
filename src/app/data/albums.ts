// 摄影专辑数据 - 按拍摄地分类
// cover: 专辑封面图路径，photos: 专辑内照片列表
// 把你的照片放进 public/albums/<slug>/ 文件夹，然后更新这里的路径

export interface Album {
  slug: string;
  name: string;
  nameEn: string;
  cover: string;
  description: string;
  photos: string[];
}

export const photoAlbums: Album[] = [
  {
    slug: "pink-lake-wa",
    name: "西澳粉红湖",
    nameEn: "Pink Lake, Western Australia",
    cover: "/albums/pink-lake-wa/cover.jpg",
    description: "Lake Hillier 粉红色的梦幻湖面",
    photos: [
      // 示例: "/albums/pink-lake-wa/1.jpg",
      // 示例: "/albums/pink-lake-wa/2.jpg",
    ],
  },
  {
    slug: "rottnest-island",
    name: "罗特尼斯岛",
    nameEn: "Rottnest Island",
    cover: "/albums/rottnest-island/cover.jpg",
    description: "短尾矮袋鼠与碧蓝海湾",
    photos: [
      // 示例: "/albums/rottnest-island/1.jpg",
    ],
  },
  {
    slug: "bondi-beach",
    name: "邦迪海滩",
    nameEn: "Bondi Beach, Sydney",
    cover: "/albums/bondi-beach/cover.jpg",
    description: "悉尼最著名的海浪与阳光",
    photos: [
      // 示例: "/albums/bondi-beach/1.jpg",
    ],
  },
  // 在这里继续添加新专辑 ↓
];

// 动漫/游戏周边专区
export const collectiblesAlbums: Album[] = [
  {
    slug: "anime-figures",
    name: "手办收藏",
    nameEn: "Anime Figures",
    cover: "/albums/anime-figures/cover.jpg",
    description: "精致手办的细节之美",
    photos: [],
  },
  {
    slug: "game-merch",
    name: "游戏周边",
    nameEn: "Game Merchandise",
    cover: "/albums/game-merch/cover.jpg",
    description: "游戏世界的实体化身",
    photos: [],
  },
  // 在这里继续添加新专辑 ↓
];

// 所有专辑合集（用于动态路由查找）
export const allAlbums: Album[] = [...photoAlbums, ...collectiblesAlbums];
