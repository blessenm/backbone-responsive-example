define([
  'jquerymobile',
  'views/homeView',
  'views/activityView',
  'views/repoCategoryView',
  'views/repoView'
], function($mobile, HomeView, ActivityView, RepoCategoryView, RepoView) {
  var Controller = {
    firstPage: true,
    isPhone: false,
    start: function() {
      var me = this;
      enquire.register('all and (max-width: 599px)', {
        match: function() {
          me.isPhone = true;
        }
      });
      enquire.unregister('all and (max-width: 599px)');
    },
    goToHomePage: function() {
      //This checks if the view is already present. Needed when the back button is pressed from the activity or repo view.
      //If present, we pass the id of the page and the reverse option. JQM will handle the rest.
      var opt = $('#home-page').length? {id: '#home-page',reverse: true} : {page: new HomeView()};
      this.changePage(opt);
    },
    goToActivityPage: function(options) {
      this.isPhone? this.changePage({page: new ActivityView({user: options.user})})
          : new ActivityView(options);
    },
    goToRepoCategoryPage: function(options) {
      if($('#repo-category-page').length) {
        this.changePage({id: '#repo-category-page',reverse: true});
      } else {
        this.isPhone? this.changePage({page: new RepoCategoryView({user: options.user})})
            : new RepoCategoryView(options);
      }
    },
    goToRepoPage: function(options) {
      this.isPhone? this.changePage({page: new RepoView({repos: options.repos})})
          : new RepoView(options);
    },
    changePage: function(options) {
      options.reverse = options.reverse? options.reverse: false;
      options.transition = options.transition? options.transition: 'slide';
      
      //If new page, add the data role, id and append to the body.
      if(options.page) {
        $('body').append(options.page.$el);
      }
      
      if(this.firstPage) {
          options.transition = 'none';
          this.firstPage = false;
      }
      
      var to = options.page? options.page.$el : options.id;
      $mobile.changePage(to, {
          changeHash : false,
          transition : options.transition,
          reverse : options.reverse
      });
    }
  }
  
  return Controller;
});