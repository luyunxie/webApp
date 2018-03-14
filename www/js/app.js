// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'],function($httpProvider) {

  //此方法用于修改$http请求的数据格式，让后台可以按照ajax，传输数据的方式接收
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
})


  .run(['$ionicPlatform', '$rootScope','$location','$ionicHistory','$ionicPopup', function($ionicPlatform, $rootScope, $location,$ionicHistory,$ionicPopup) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {

        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {

        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
    
    
    //***********************************************
$ionicPlatform.registerBackButtonAction(function (e){
        //阻止默认的行为
        e.preventDefault();
        // 退出提示框
        function showConfirm() {
          var servicePopup = $ionicPopup.show({
            title: '提示',
            subTitle: '你确定要退出应用吗？',
            scope: $rootScope,
            buttons: [
              {
                text: '取消',
                type: 'button-clear button-assertive',
                onTap: function () {
                  return 'cancel';
                }
              },
              {
                text: '确认',
                type: 'button-clear button-assertive border-left',
                onTap: function (e) {
                  return 'active';
                }
              },
            ]
          });
          servicePopup.then(function (res) {
            if (res == 'active') {
              // 退出app
              ionic.Platform.exitApp();
            }
          });
        }
         // 判断当前路由是否为各个导航栏的首页，是的话则显示提示框
      if ($location.path() == '/tab/home'||$location.path() == '/tab/lessonlist'||$location.path() == '/tab/mycourse'||$location.path() == '/tab/personal') {

        if ($rootScope.backButtonPressedOnceToExit) {
         showConfirm()        
        } else {
          $rootScope.backButtonPressedOnceToExit = true;
          setTimeout(function () {
            $rootScope.backButtonPressedOnceToExit = false;
          }, 2000);
        }
      }
      else if ($ionicHistory.backView()) {
        $ionicHistory.goBack();
      } else {
        $rootScope.backButtonPressedOnceToExit = true;
        setTimeout(function () {
          $rootScope.backButtonPressedOnceToExit = false;
        }, 2000);
      }
      $ionicHistory.backView.go();
      e.preventDefault(); 
        return false;
      }, 101); //101优先级常用于覆盖‘返回上一个页面’的默认行为
  }])


  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    /*用于修改安卓tab居下 （在参数里要加入$ionicConfigProvider）*/
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('left');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    /*用于修改安卓tab居下 --结束*/


    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:
      //首页
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-home.html',
            controller: 'HomeCtrl'
          }
        }
      })
        //课程列表页
        .state('tab.lessonlist', {
          url: '/lessonlist',
          views: {
            'tab-lessonlist': {
              templateUrl: 'templates/tab-lessonlist.html',
              controller: 'LessonlistCtrl'
            }
          }
        })
        //我的课程页面
        .state('tab.mycourse', {
          url: '/mycourse',
          cache:'false',
          views: {
            'tab-mycourse': {
              templateUrl: 'templates/tab-mycourse.html',
              controller: 'MycourseCtrl'
            }
          }
        })

        //个人信息页面登录
        .state('tab.personal', {
          url: '/personal',
          cache:'false',
          views: {
            'tab-personal': {
              templateUrl: 'templates/tab-personal.html',
              controller: 'PersonalCtrl'
            }
          }
        })
        //个人信息
        .state('tab.information', {
          url: '/information',
          cache:'false',
          views: {
            'tab-personal': {
              templateUrl: 'templates/tab-information.html',
              controller: 'InformationCtrl'
            }
          }
        })
        //注册页面
        .state('tab.register', {
          url: '/register',
          views: {
            'tab-personal': {
              templateUrl: 'templates/tab-register.html',
              controller: 'RegisterCtrl'
            }
          }
        })
        //忘记密码页面
        .state('tab.forget', {
          url: '/forget',
          views: {
            'tab-personal': {
              templateUrl: 'templates/tab-forget.html',
              controller: 'ForgetCtrl'
            }
          }
        })


        //首次进入的轮播
        .state('tab.firstEnter', {
          url: '/firstEnter',
          views: {
            'tab-home': {
              templateUrl: 'templates/tab-firstEnter.html',
              controller: 'FirstEnterCtrl'
            }
          }
        })

        //首页学习页面
        .state('tab.homeStudy', {
          url: '/homeStudy/:myId',
          cache:'false',
          views: {
            'tab-home': {
              templateUrl: 'templates/tab-study.html',
              controller: 'StudyCtrl'
            }
          }
        })

        //课程列表学习页面
        .state('tab.lesslistStudy', {
          url: '/lesslistStudy/:myId',
          cache:'false',
          views: {
            'tab-lessonlist': { /*只修改了这里*/
              templateUrl: 'templates/tab-study.html',
              controller: 'StudyCtrl'
            }
          }
        })

        //我的课程学习页面
        .state('tab.myStudy', {
          url: '/myStudy/:myId',
          cache:'false',
          views: {
            'tab-mycourse': {
              templateUrl: 'templates/tab-study.html',
              controller: 'StudyCtrl'
            }
          }
        })
//设置页面
        .state('setInfor', {
          url: '/setInfor',
          cache:false,
          templateUrl: 'templates/tab-setInfor.html',
          controller: 'SetInforCtrl'
        })

// if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');
  });
