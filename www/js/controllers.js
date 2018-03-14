angular.module('starter.controllers', [])

  .run(function ($rootScope, locals) {
    if (!locals.get('userName')) {
      locals.set('userName', "");
    }
  })


  /*首页控制器*/
  .controller('HomeCtrl', function ($scope, HomeGoodlistRow, $rootScope, HomeNewLists,locals,HomechooseLists, $ionicSideMenuDelegate, $http, $ionicSlideBoxDelegate, shareData) {

    if(!(locals.get("isLoad") == "isLoad")){
      window.location.href = "#/tab/firstEnter";
    }
//  $http.post($rootScope.URLAdmin + '/Handler/OfflineCourseHandler.ashx?action=indexshow', '')
//    .success(function (response) {
//      console.log(response)
//      //顶部轮播数据及相应的设置
//      $scope.lunbopics = response.data.bannerList;
//      $ionicSlideBoxDelegate.$getByHandle("slideimgs").update();
//      $ionicSlideBoxDelegate.$getByHandle("slideimgs").loop("true");
//
//      //好评榜数据
//      $scope.homeGoodlistRows = [[response.data.goodList[0], response.data.goodList[1]], [response.data.goodList[2], response.data.goodList[3]]];
//      //最新课程数据
//      $scope.homeNewLists = [[response.data.newList[0], response.data.newList[1]], [response.data.newList[2], response.data.newList[3]]];
//      //  猜你喜欢数据
//      $scope.homechooseLists = response.data.chooseList;
//    });
        $scope.homeGoodlistRows = HomeGoodlistRow.all();
        $scope.homeNewLists = HomeNewLists.all();
//轮播图数据
//    $scope.lunbopics = [{
//      "id": 0,
//      "imgsrc": "slideimage01.png"
//    },
//      {
//        "id": 1,
//        "imgsrc": "slideimage02.png"
//      },
//      {
//        "id": 2,
//        "imgsrc": "slideimage03.png"
//      }];
    //好评榜
    //$scope.homeGoodlistRows = HomeGoodlistRow.all();
    $scope.tz_study = function (myId) {
      window.location = "#/tab/homeStudy/" + myId
    }
    ////最新课程数据返回代码
    //$scope.homeNewLists = HomeNewLists.all();
    ////猜你喜欢
    //$scope.homechooseList = HomechooseLists.all()
    //点击滑出侧边栏
    $scope.toggleLeftSideMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };

    //点击搜索

    //$scope.doSearch = function(){
    //  console.log(444)
    //  console.log($scope.searchText)
    //  if($scope.searchText){
    //    console.log(555)
    //    shareData.set('indexSearchText',$scope.searchText);
    //    $scope.searchText = '';
    //    window.location.href = "#/tab/lessonlist";
    //  }
    //};

    //点击搜索,跳转到课程列表页，并设置需要 传过去的参数
    $scope.doSearch = function () {
      console.log($scope.searchText);
      if ($scope.searchText) {
        shareData.set('indexSearchText', $scope.searchText);
        $scope.searchText = '';
        window.location.href = "#/tab/lessonlist";
      }
    };
    //搜索框点击键盘的搜索键
    $scope.myKeyup = function (e) {
      var keycode = window.event ? e.keyCode : e.which;
      if (keycode == 0 || keycode == 13) {
        $scope.doSearch();
      }
    };


  })


  /*课程列表控制器*/
.controller('LessonlistCtrl', function ($scope, courseLists, $http, $rootScope, $timeout, shareData) {
      //$scope.courseListBtns = [
      //  {id: 0, btnName: "全部"},
      //  {id: 1, btnName: "UI"},
      //  {id: 2, btnName: "JAVA"},
      //  {id: 3, btnName: "Android"},
      //  {id: 4, btnName: "IOS"},
      //  {id: 5, btnName: "其它"}
      //]

      $scope.priceBtns = [
        {id: 0, btnName: "全部"},
        {id: 1, btnName: "免费"},
        {id: 2, btnName: "收费"}
      ]
      //课程列表单击事件
      $scope.lilist = false;
      $scope.lcolor = {color: "#333"};
//    $scope.courselist = function () {
        //专业分类子级内容数据
//      $http.post($rootScope.URLAdmin + '/Handler/OfflineCourseHandler.ashx?action=getcategory', '')
//        .success(function (response) {
//          $scope.courseListBtns = response.data;
//        });
//      $scope.courseListBtns= courseLists.all();
//
//      $scope.lilist = !$scope.lilist;
//      $scope.prlist = false;
//      $scope.pcolor = {color: "#333"};
//      if ($scope.lilist == true) {
//        $scope.lcolor = {color: "#63aafc"};
//      } else {
//        $scope.lcolor = {color: "#333"};
//      }
//    }
      $scope.courseListBtns= courseLists.all();

        $scope.lilist = !$scope.lilist;
        $scope.prlist = false;
        $scope.pcolor = {color: "#333"};
        if ($scope.lilist == true) {
          $scope.lcolor = {color: "#63aafc"};
        } else {
          $scope.lcolor = {color: "#333"};
        }
        
      //价格单击事件
      $scope.price = function () {
        $scope.prlist = !$scope.prlist;
        $scope.lilist = false;
        $scope.lcolor = {color: "#333"};
        if ($scope.prlist == true) {
          $scope.pcolor = {color: "#63aafc"};
        } else {
          $scope.pcolor = {color: "#333"};
        }
      }


  //课程列表页面加载数据  这里传入数据1，返回数据的前5条
      //  $scope.lists = courseLists.page(1);
  // 加载更多
      //上拉加载更多数据loadMore函数
      //$scope.moredata = true;//为true时加载数据
      //$scope.loadMore = function () {
      //  var newList = courseLists.page(1);
      //  $scope.lists = $scope.lists.concat(newList);
      //  if (newList.length == 0) {
      //    $scope.moredata = false;//没有更多数据停止加载
      //  }
      //  $scope.$broadcast('scroll.infiniteScrollComplete');
      //};


  //上拉加载更多事件
  //    $scope.$on('$stateChangeSuccess', function () {
  //      $scope.loadMore();
  //    });
      //筛选事件
      //课程列表筛选事件
  //    $scope.courseSerch = function (searchText) {
  //      $scope.lists = courseLists.courseSerch(searchText);
  //      $scope.lilist = false;
  //    }
  ////价格筛选事件
  //    $scope.priceSearch = function (searchText) {
  //      $scope.lists = courseLists.courseSerch(searchText);
  //      $scope.prlist = false;
  //    }
  $scope.nowPage = 0;
  $scope.lists = [];
  $scope.searchText = '';
  $scope.CategoryId = '';
  $scope.CpriceId = '';


  //是否为首页跳转过来的。
  if (shareData.get('indexSearchText')) {
    $scope.searchText = shareData.get('indexSearchText');
    shareData.set('indexSearchText', '');
  }


  $scope.goPage = function (pageStart) {
    //当开始ajax的时候停止加载
    $scope.moredata = false;
    var myData = {
      'pageStart': pageStart,
      'searchText': $scope.searchText,//搜索的专业名称
      'CategoryTwo': $scope.CategoryId,//专业id
      'CpriceId': $scope.CpriceId //价格id
    };
    $http.post($rootScope.URLAdmin + '/Handler/OfflineCourseHandler.ashx?action=courseshow', myData)
      .success(function (response) {
        console.log(myData);
        console.log(response);
        $scope.totalPage = Math.ceil(response.data.count / response.data.pageSize);
        $scope.lists = $scope.lists.concat(response.data.list);

        //$scope.lists = response.data.list;
        $scope.nowPage = response.data.pageStart;
        if ($scope.totalPage > response.data.pageStart) {
          $scope.moredata = true;//恢复加载
        }
      });
  };
  //上拉加载更多数据loadMore函数
  $scope.moredata = true;//为true时加载数据
  $scope.loadMore = function () {
    if ($scope.moredata) {
      $scope.goPage($scope.nowPage + 1);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
  };
    $scope.inRun = true;
    $scope.$on('$stateChangeSuccess', function () {
      //var num = $scope.num + 1;
      //console.log("$stateChangeSuccess事件触发" + num + "次");
      if (!$scope.inRun) {
        $scope.loadMore();
        $scope.inRun = false;
      } else {
        $scope.inRun = true;
      }
    });




  //课程列表和价格筛选事件
  $scope.pricouSearch = function (searchText, CategoryId, CpriceId) {
    $scope.searchText = searchText;
    $scope.CategoryId = CategoryId;
    $scope.CpriceId = CpriceId;

    $scope.nowPage = 0;
    $scope.lists = [];
    $scope.moredata = true;//没有更多数据停止加载
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.prlist = false;
    $scope.lilist = false;
    $scope.lcolor = {color: "#333"};
    $scope.pcolor = {color: "#333"};
    $scope.loadMore();
  }

  //搜索
  $scope.myKeyup = function (e) {
    var keycode = window.event ? e.keyCode : e.which;
    if (keycode == 0 || keycode == 13) {
      //console.log("搜索："+$scope.searchInputText);
      $scope.pricouSearch($scope.searchInputText, '', '');
      $scope.searchInputText = '';
    }
  }
  //下拉刷新
  $scope.doRefresh = function () {
    $timeout(function () {
      $scope.pricouSearch('', '全部', '');
      $scope.$broadcast("scroll.refreshComplete");
    }, 1000);
  }

  $scope.tz_study = function (myId) {
    window.location = "#/tab/lesslistStudy/" + myId;
  }

    })


  /*我的课程控制器*/
  .controller('MycourseCtrl', function ($scope, courseFirst, courseSecond, $http, locals, $rootScope) {
    //我的课程
    $scope.mycou = true;
    $scope.mycol = false;
    $scope.color = {color: "#63aafc"};
    $scope.colorc = {color: "#333"};
    $scope.mylesson = function () {
      $scope.data.showDelete = false;
      $scope.mycou = true;
      $scope.mycol = false;
      $scope.color = {color: "#63aafc"};
      $scope.colorc = {color: "#333"};
    }
    //收藏课程
    $scope.course = function () {
      $scope.data.showDelete = false;
      $scope.mycou = false;
      $scope.mycol = true;
      $scope.color = {color: "#333"};
      $scope.colorc = {color: "#63aafc"};
    }
//
////加载数据
//    $scope.itemFir = courseFirst.all();
//    $scope.itemSec = courseSecond.all();
    $scope.data = {
      showDelete: false
    };
    //分享
    $scope.share = function (item) {
      window.plugins.socialsharing.share('给你分享一个很棒的课程', null, null,$rootScope.URLAdmin+'/www/index.html#/tab/lesslistStudy/'+id)
     };
    //删除
    $scope.onItemDelete = function (list, item) {
      var myId = {courseId: item.ID};
      $http.post($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=deletecollection', myId)
        .success(function (response) {
          $scope[list].splice($scope[list].indexOf(item), 1);
          //$scope.itemSec.splice($scope.itemSec.indexOf(item), 1);
        });
    };


    //先设置让其显示“请登录”
    $scope.dl_tf = true;
    ////我的课程数据 请求
    $http.get($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=mycourse&userName=' + locals.get('userName'), '')
      .success(function (response) {
        $scope.dl_tf = false;
        console.log(response);
        $scope.itemFir = response.data;
        //收藏课程数据
        $http.get($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=mycollection&userName=' + locals.get('userName'), '')
          .success(function (response) {
            //console.log(response.data);
            $scope.itemSec = response.data;
          });
      });
    //进入学习页面
    $scope.tz_study = function (myId) {
      window.location = "#/tab/myStudy/" + myId;
    }

  })


  /*个人中心登录控制器*/
  .controller('PersonalCtrl', function ($scope, $http, $rootScope, locals, $ionicPopup) {

    //防止页面调试过程中的页面切换导致下部tabs隐藏了，无法切换，这里设置切换到登录页的时候，显示tabs。
    $rootScope.hideTabs = false;

    var oldUser = {
      "userName": locals.get("userName")
    };
    $http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=isLogin', oldUser)
      .success(function (response) {
        if (response.success) {
          window.location = "#/tab/information";
        }
      });

    //添加以下内容
    $scope.loginuser = {
      name: '',
      password: ''
    };
    $scope.doLogin = function () {
      if (!!$scope.loginuser.name && !!$scope.loginuser.password) {
        var myData = {
          userName: $scope.loginuser.name,
          userPwd: $scope.loginuser.password
        };

        $http.post($rootScope.URLAdmin +
            '/Handler/UserHandler.ashx?action=login', myData)
          .success(function (response) {

            if (response.err) {
              $ionicPopup.alert({title: "失败", template: response.err});
            } else {
              console.log("asdfasd")
              console.log(response)
              locals.set("userName", response.data.name)
              window.location = "#/tab/information"
            }
          });
      }

    }
  })
  /*个人信息显示*/
  .controller('InformationCtrl', function ($scope, $rootScope, $http, locals) {

    $scope.infor = {
      name: "",
      email: "",
      phone: ""
    };

    $http.get($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=returnuserinfo&userName=" + locals.get('userName'), '')
      .success(function (response) {
        $scope.infor.name = response.userName;
        $scope.infor.email = response.email;
        $scope.infor.phone = response.phone;
      })

    //退出
    $scope.quit = function () {
      var data = {
        "userName": locals.get("userName")
      };
      $http.post($rootScope.URLAdmin + "/Handler/UserHandler.ashx?action=quit", data)
        .success(function (response) {
          locals.set("userName", "");
          window.location = "#/tab/personal";
        })
    };


    //$http.get("JSON/JSON.txt")
    //  .success(function (response) {
    //    $scope.name = response.records[1].name;
    //    $scope.email = response.records[1].email;
    //    $scope.phone = response.records[1].phone;
    //  });

    //$scope.quit = function () {
    //  window.location = "#/tab/personal"
    //}
  })
  /*注册页面控制器*/
  .controller('RegisterCtrl', function ($scope, $ionicPopup, $http, $rootScope) {

    /*注册页面*/
    $scope.infor = {
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordt: ''
    };

    //*注册页面判断（写在上边的内容里）*/
    $scope.register = function (infor) {
      var email_yz = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var photo_yz = /^1\d{10}$/;
      if (!!infor.name && !!infor.email && !!infor.phone && !!infor.password && !!infor.passwordt) {
        if (!email_yz.test(infor.email)) {
          $ionicPopup.alert({
            title: '提示信息!',
            template: '邮箱格式不正确，请重新输入'
          });
        } else if (!photo_yz.test(infor.phone)) {
          $ionicPopup.alert({
            title: '提示信息!',
            template: '请输入正确手机号码'
          });
        } else if (infor.password != infor.passwordt) {
          $ionicPopup.alert({
            title: '提示信息!',
            template: '两次密码不相同，请重新输入'
          });
        } else {
          //注册的提交事件
          var myInfor = {
            userName: $scope.infor.name,
            email: $scope.infor.email,
            phone: $scope.infor.phone,
            userPwd: $scope.infor.password,
            nickname: '',
            userPic: ''
          };

          $http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=add', myInfor)
            .success(function (response) {
              if (response.err) {
                $ionicPopup.alert({
                  title: '提示信息!',
                  template: response.err
                });
              } else {

                $ionicPopup.alert({
                  title: '提示信息!',
                  template: '注册成功！'
                });
                window.location = "#/tab/personal"
              }
            });
        }
      } else {
        $ionicPopup.alert({
          title: '提示信息!',
          template: '请输入内容'
        });
      }
      ;
    }
  })

  /*忘记密码页面*/
  .controller('ForgetCtrl', function ($scope, $ionicPopup, $http, $rootScope) {

    /*忘记密码页面*/
    $scope.infor = {
      name: '',
      phone: '',
      password: '',
      passwordt: ''
    };
    //*忘记密码页面判断（写在上边的内容里）*/
    $scope.forget = function (infor) {
      var photo_yz = /^1\d{10}$/;
      if (!!infor.name && !!infor.phone && !!infor.password && !!infor.passwordt) {
        if (!photo_yz.test(infor.phone)) {
          $ionicPopup.alert({
            title: '提示信息!',
            template: '请输入正确手机号码'
          });
        } else if (infor.password != infor.passwordt) {
          $ionicPopup.alert({
            title: '提示信息!',
            template: '两次密码不相同，请重新输入'
          });
        } else {
          var myInfor = {
            userName: $scope.infor.name,
            phone: $scope.infor.phone,
            userPwd: $scope.infor.password,
            nickname: '',
            userPic: ''
          };

          //修改密码请求
          $http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=setPassword', myInfor)
            .success(function (response) {
              if (response.err) {
                $ionicPopup.alert({
                  title: '提示信息!',
                  template: response.err
                });
              } else {

                $ionicPopup.alert({
                  title: '提示信息!',
                  template: '密码修改成功！'
                });
                window.location = "#/tab/personal"
              }

            })
        }
      } else {
        $ionicPopup.alert({
          title: '提示信息!',
          template: '请输入内容'
        });
      }
      ;
    }
  })
  /*学习页面*/
  .controller('StudyCtrl', function ($scope, studyList, pingjiaList, $ionicModal, $stateParams, $http, locals, $rootScope) {
    //加载目录信息
    //$scope.studymulu = studyList.all();
    ////加载详情信息
    //$scope.assesslist = pingjiaList.all();
    //目录和详情标签切换开始
    $scope.mymulu = true;
    $scope.myxiangqing = false;
    $scope.color = {color: "#63aafc"};
    $scope.ml_left = function () {
      $scope.myxiangqing = false;
      $scope.mymulu = true;
      $scope.color = {color: "#63aafc"};
      $scope.colorc = {color: "#333"}
    }
    $scope.xq_right = function () {
      $scope.mymulu = false;
      $scope.myxiangqing = true;
      $scope.color = {color: "#333"};
      $scope.colorc = {color: "#63aafc"}
    }
//目录和详情标签切换结束
    /*添加的内容*/
    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });


    /*_____________________*/
    //获取页面传过来的课程的id
    var mystudy = {
      courseId: $stateParams.myId
    };
    var loginUserStudy = {
      userName: locals.get('userName'),
      courseId: $stateParams.myId
    };
    $scope.myId = $stateParams.myId;
    //判断是否登录

    $http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=isLogin', {"userName": locals.get("userName")})
      .success(function (response) {

        if (response.success) {
          /*已登录执行的代码*/
          $http.post($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=learnshow", loginUserStudy)
            .success(function (response) {

              $scope.CDlists = response.data.CDlist;

              console.log(response.data.CDlist)
              $scope.broadcast(response.data.CDlist[0].Vlist[0].Vurl, response.data.CDlist[0].Vlist[0].ID);
              $scope.Cname = response.data.Cname;
              $scope.evaluates = response.data.evaluate.list;

              console.log(response.data.evaluate.list);
              $scope.footerPingjia = false;


              //判断是否收藏
              $scope.shouchangYN = '';
              $scope.isActive = response.data.ifColected;
              if ($scope.isActive == true) {
                $scope.shouchangYN = '已收藏';
              } else {
                $scope.shouchangYN = '收藏';
              }
//判断是否已购买
              console.log(response.data.ifPay);
              $scope.goumaiYN = '';
              if (response.data.ifPay == true) {
                $scope.video_login = false;//提示登录为隐藏
                $scope.test = "active";//为蓝色
                $scope.goumaiYN = '已购买';
                $scope.video_buy = false//提示购买的隐藏
              } else {
                $scope.video_login = false;
                $scope.test = '';
                $scope.video_buy = true;
                $scope.goumaiYN = '购买';
              }
            })


        } else {
          /*未登录执行的代码*/
          //未登录请求
          $http.post($rootScope.URLAdmin + "/Handler/OfflineCourseHandler.ashx?action=learnshow", mystudy)
            .success(function (response) {
              $scope.footerPingjia = true;//单击评价不会出现弹窗
              $scope.shouchangYN = '收藏';
              $scope.video_login = true;//提示登录弹窗显示
              $scope.goumaiYN = '购买';
              $scope.CDlists = response.data.CDlist;
              $scope.broadcast(response.data.CDlist[0].Vlist[0].Vurl, response.data.CDlist[0].Vlist[0].ID);
              //$scope.Vurl = response.data.CDlist[0].Vlist[0].Vurl;
              $scope.Cname = response.data.Cname;
              $scope.evaluates = response.data.evaluate.list;
            });
        }
      })
//目录中当前播放的改变颜色
    $scope.broadcast = function (url, Id) {
      //把视频的地址转换成我们服务上的地址
      var videoUrl = $rootScope.URLAdmin + "/" + url;
      //$scope.Vurl = url;
      //window.plugins.html5Video.initialize({
      //  "video1" : $rootScope.URLAdmin + url
      //});
      //window.plugins.html5Video.play("video1");

      //视频播放兼容写法
      try {
        window.plugins.html5Video.initialize({
          "video1": videoUrl
        });
        $scope.pcTrue = false;
        if ($scope.video_login == false && $scope.shadow.video_buy == false) {
          window.plugins.html5Video.play("video1");
        }
      } catch (e) {
        $scope.pcTrue = true;
        $scope.Vurl = videoUrl;

      }


      for (var i = 0; i < $scope.CDlists.length; i++) {
        for (var j = 0; j < $scope.CDlists[i].Vlist.length; j++) {
          if ($scope.CDlists[i].Vlist[j].ID == Id) {
            $scope.CDlists[i].Vlist[j].isViewing = true;
          } else {
            $scope.CDlists[i].Vlist[j].isViewing = false;
          }
        }
      }
    };

    //接受评价的事件
    $scope.$on('evaluate', function (event, data) {
      var newDate = new Date();
      var date = newDate.getFullYear() + "-" + ((newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : ("0" + (newDate.getMonth() + 1))) + "-" + (newDate.getDate() >= 10 ? newDate.getDate() : ("0" + newDate.getDay()));
      var evaluate = {
        UserId: data.userName,
        createAt: date,
        evaluate: data.evaluate
      }
      console.log(evaluate)
      $scope.evaluates.push(evaluate)
    });
  })

  //学习页底部导航的控制器
  .controller('studyFooterCtrl', function ($scope, $http, $stateParams, $rootScope, locals) {
    $scope.scGo = function () {
      var myID = {
        courseId: $stateParams.myId,
        userName: locals.get("userName")
      }
      $http.post($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=collection", myID)
        .success(function (response) {
          console.log(response)
          $scope.isActive = response.ifColected;
          if ($scope.isActive == true) {
            $scope.shouchangYN = '已收藏';
          } else {
            $scope.shouchangYN = '收藏';
          }
        })
    }
    //购买请求
    $scope.payGo = function () {
      //window.location.href="#/tab/pay";
      var myID = {
        courseId: $stateParams.myId,
        userName: locals.get("userName")
      }
      var charge = {
        "id": "ch_ez9a5O9GSCy5fj5afHTGmvHG",
        "object": "charge",
        "created": 1442542657,
        "livemode": false,
        "paid": false,
        "refunded": false,
        "app": "app_ir1uHKe9aHaL9SWn",
        "channel": "upacp",
        "order_no": "123456789",
        "client_ip": "127.0.0.1",
        "amount": 100,
        "amount_settle": 0,
        "currency": "cny",
        "subject": "Your Subject",
        "body": "Your Body",
        "extra": {},
        "time_paid": null,
        "time_expire": 1442546257,
        "time_settle": null,
        "transaction_no": null,
        "refunds": {
          "object": "list",
          "url": "/v1/charges/ch_ez9a5O9GSCy5fj5afHTGmvHG/refunds",
          "has_more": false,
          "data": []
        },
        "amount_refunded": 0,
        "failure_code": null,
        "failure_msg": null,
        "metadata": {},
        "credential": {"object": "credential", "upacp": {"tn": "201509181017374044084", "mode": "00"}},
        "description": null
      };

      //发起模拟支付
      try {
        pingpp.createPayment(charge, function (result) {
          //alert('suc: '+result);  //"success"

          //支付成功，请求后台，变更课程为已购买
          $http.post($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=buy", myID)
            .success(function (response) {
              //window.location("#/tab/pay");
              console.log(response);
              $scope.test = "active";
              $scope.goumaiYN = '已购买';
              console.log($scope.video_buy);
              $scope.shadow.video_buy = false;  //提示购买的隐藏
            })
        }, function (result) {
          alert('err: ' + result);  //"fail"|"cancel"|"invalid"
        });
      }
      catch (e) {
        alert(e);
        //如果报错，说明是在浏览器浏览的，也请求后台，变更课程为已购买
        $http.post($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=buy", myID)
          .success(function (response) {
            //window.location("#/tab/pay");
            console.log(response);
            $scope.test = "active";
            $scope.goumaiYN = '已购买';
            console.log($scope.video_buy);
            $scope.shadow.video_buy = false;  //提示购买的隐藏
          })
      }
    }
  })
  /*评论的控制器*/
  .controller('TaskCtrl', function ($scope, $http, $ionicPopup, $rootScope, locals) {
    //关闭窗口的事件
    $scope.close = function () {
      $scope.modal.hide();
    }

    //评论提交事件
    $scope.createContact = function (textareaValue) {
      var myComments = {
        courseId: $scope.myId,
        evaluate: textareaValue,
        userName: locals.get("userName")
      };
      console.log(myComments)
      console.log(myComments.evaluate)
      console.log(myComments.evaluate)
      if (!myComments.evaluate) {
        $ionicPopup.alert({
          title: '提示信息!',
          template: '请输入内容！'
        });
      } else {
        $http.post($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=addcoursecomments", myComments)
          .success(function (response) {
            $scope.$emit('evaluate', myComments);
            $scope.modal.hide();
          })
      }
    }
  })
  //---------------------
  /*第一次进入时轮播控制器*/
  .controller('FirstEnterCtrl', function ($scope, locals) {
    $scope.toIndex = function () {
      locals.set("isLoad", "isLoad");
      window.location.href = "#/tab/home";
    }
    if (!(locals.get("isLoad") == "isLoad")) {
      window.location.href = "#/tab/firstEnter";
    }
  })
  //个人信息的设置页面
  .controller('SetInforCtrl', function ($scope, locals, $http, $rootScope, $ionicPopup) {
    /*设置页面*/
    $scope.infor = {
      name: "",
      email: "",
      phone: "",
    };

    if (locals.get('userName')) {
      $http.get($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=returnuserinfo&userName=" + locals.get('userName'), '')
        .success(function (response) {
          //console.log(response)
          if (!response.userName) {
            $ionicPopup.alert({
              title: '提示信息!',
              template: "请登录"
            });
            window.location = "#/tab/personal"
          } else {
            $scope.infor.name = response.userName;
            $scope.infor.email = response.email;
            $scope.infor.phone = response.phone;
          }
        })
    } else {
      $ionicPopup.alert({
        title: '提示信息!',
        template: "请登录"
      });
      window.location = "#/tab/personal"
    }


    //保存
    $scope.save = function (infor) {
      var myData = {
        'userName': infor.name,
        'email': infor.email,
        'phone': infor.phone
      };
      var email_yz = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var photo_yz = /^1\d{10}$/;
      if (!!infor.name && !!infor.email && !!infor.phone) {
        if (!email_yz.test(infor.email)) {
          $ionicPopup.alert({
            title: '提示信息!',
            template: '邮箱格式不正确，请重新输入'
          });
        } else if (!photo_yz.test(infor.phone)) {
          $ionicPopup.alert({
            title: '提示信息!',
            template: '请输入正确手机号码'
          });
        } else {
          $http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=save', myData)
            .success(function (res) {
              if (res.success) {
                $ionicPopup.alert({
                  title: '提示信息!',
                  template: '修改成功'
                });
                window.location = "#/tab/home"
              }
            })
        }
      } else {
        $ionicPopup.alert({
          title: '提示信息!',
          template: '请输入内容'
        });
      }
      ;
    };

    $scope.quit = function () {
      $ionicPopup.alert({
        title: '提示信息!',
        template: "退出成功"
      });
      window.location = "#/tab/home"
    }
  })

  /*----------------------------自定义服务------------------------------*/
  /*去掉下面tabs 的自定义指令*/
  .directive('hideTabs', function ($rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        scope.$on('$ionicView.beforeEnter', function () {
          $rootScope.hideTabs = attributes.hideTabs;
        });

        scope.$on('$ionicView.beforeLeave', function () {
          $rootScope.hideTabs = false;
        });
      }
    };
  })
  /*本地的数据储存 服务*/
  .factory('locals', ['$window', function ($window) {
    return {
      //存储单个属性
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      //读取单个属性
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      }
    }
  }])

  //页面之间共享数据的方法，使用方式，一个页面设置值，跳转页面，然后在另一个页面取值，并设置值为空。
  .factory('shareData', function ($window) {
    var allData = {};
    return {
      //存储单个属性
      set: function (key, value) {
        allData[key] = value;
      },
      //读取单个属性
      get: function (key, defaultValue) {
        return allData[key] || defaultValue;
      }

    }
  })
  //自定义过滤器
  .filter('truster', function ($sce) {
    return function (text) {
      return $sce.trustAsResourceUrl(text);
    }
  })
  .filter('time', function () {
    return function (text) {
      return text.slice(0, 10);
    }
  })


