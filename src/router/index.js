import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Community from '@/pages/community/community'
import CommunityContent from '@/pages/communityContent/communityContent'
import Login from '@/pages/login/login'
import NewPost from '@/pages/newPost/newPost'
import DetailPost from '@/pages/detailPost/detailPost'
import PersonalInformation from '@/pages/personalInformation/personalInformation'
import SetIformation from '@/pages/setIformation/setIformation'
import SharePost from '@/pages/sharePost/sharePost'
import SearchContent from '@/pages/searchContent/searchContent'
import Review from '@/pages/review/review'
import Reviews from '@/pages/reviews/reviews'
import ManagePost from '@/pages/managePost/managePost'
import DetailPerson from '@/pages/detailPerson/detailPerson'
import MineReview from '@/pages/mineReview/mineReview'
import SchoolList from '@/pages/schoolList/schoolList'
import Save from '@/pages/save/save'
import MineDetailPost from '@/pages/mineDetailPost/mineDetailPost'
import SetHeader from '@/pages/setHeader/setHeader'
import Password from '@/pages/password/password'
import ChangePhone from '@/pages/changePhone/changePhone'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/community',
      name: 'Community',
      component: Community
    },
    {
      path: '/communityContent',
      name: 'CommunityContent',
      component: CommunityContent

    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/newPost',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/detailPost',
      name: 'DetailPost',
      component: DetailPost
    },
    {
      path: '/personalInformation',
      name: 'PersonalInformation',
      component: PersonalInformation
    },
    {
      path: '/setIformation',
      name: 'SetIformation',
      component: SetIformation
    },
    {
      path: '/sharePost',
      name: 'SharePost',
      component: SharePost
    },
    {
      path: '/searchContent',
      name: 'SearchContent',
      component: SearchContent
    },
    {
      path: '/review',
      name: 'Review',
      component: Review
    },
    {
      path: '/reviews',
      name: 'Reviews',
      component: Reviews
    },
    {
      path: '/managePost',
      name: 'ManagePost',
      component: ManagePost
    },
    {
      path: '/detailPerson',
      name: 'DetailPerson',
      component: DetailPerson
    },
    {
      path: '/mineReview',
      name: 'MineReview',
      component: MineReview
    },
    {
      path: '/schoolList',
      name: 'SchoolList',
      component: SchoolList
    },
    {
      path: '/save',
      name: 'Save',
      component: Save
    },
    {
      path: '/mineDetailPost',
      name: 'MineDetailPost',
      component: MineDetailPost
    },
    {
      path: '/setHeader',
      name: 'SetHeader',
      component: SetHeader
    },
    {
      path: '/password',
      name: 'Password',
      component: Password
    },
    {
      path: '/changePhone',
      name: 'ChangePhone',
      component: ChangePhone
    }
  ]
})
