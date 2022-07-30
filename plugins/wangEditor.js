import Vue from 'vue';
import wangeditor from 'wangeditor';

Vue.prototype.$wangeditor = content => {
  return new wangeditor(content);
}