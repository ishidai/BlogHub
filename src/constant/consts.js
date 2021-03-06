export default {
  // 主页信息获取
  home: '/api/common/v1.0/posts/',
  // 登录
  login: '/api/v1.0/token',
  // 获取用户信息
  user: '/api/v1.0/user/info',
  // 用户发表过的文章接口
  posts: '/api/v1.0/posts/',
  // 文章内容接口
  content: '/api/common/v1.0/posts/',
  // 用户提交博客来源的接口
  blogs: '/api/v1.0/blogs/',
  // 用户访问量
  blog_views: '/api/common/v1.0/blogs/',
  // 展示主页blog数据
  show_blogs: '/api/common/v1.0/showblogs',
  // 注册用户
  signin: '/api/common/v1.0/signin',
  // 发表文章页 分类列表
  categories: '/api/common/v1.0/categories/',
  collect: '/api/v1.0/collect',
  // 展示主页blog分类栏目数据
  blog_categories: '/api/common/v1.0/categories/blog/',


  categories_list: '/api/common/v1.0/categories/list',

  // 更新用户资料
  update_user_info: '/api/v1.0/update/user',

  // 获取用户分享过的文章
  user_posts: '/api/common/v1.0/users',

  base_upload_img_address: 'https://images.bokeka.com/',
  // 关注
  follow: '/api/v1.0/follow',
  // 取消关注
  unfollow: '/api/v1.0/unfollow',
  // 相互是否关注
  is_follow: '/api/v1.0/following',
  // 对于post文章：是否点过赞
  is_vote: '/api/v1.0/post/voted/state',
  // 点赞
  vote: '/api/v1.0/post/vote',
  // 对于post文章：是否点过赞
  is_collect: '/api/v1.0/post/collect/state',
  // 点赞
  collect: '/api/v1.0/post/collect',
  // 拉取标签分类列表
  list_tags: '/api/common/v1.0/list/tags',
    // 获取tag列表
  all_tags: '/api/common/v1.0/all/tags',
  // 查找标签
  search_tag: '/api/common/v1.0/search/tag/'
}
