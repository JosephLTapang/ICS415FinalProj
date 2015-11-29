if (Meteor.isServer) {
}

if (Meteor.isClient) {
//event that takes info from sign up fields and creates a new user object in the collection
//Placed in .isClient as templates aren't defined in server
Template.signUp.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        }, function(error){
		//error codes
    		if(error){
        		console.log(error.reason); // Output error if sign up fails
    		} else {
        		Router.go("home"); // Redirect user if sign up succeeds
			Meteor.loginWithPassword(email, password);//after signing up auto login
    		}
	});
    }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
	//function in .loginWithPassword returns error message in console if login info incorrect
        Meteor.loginWithPassword(email, password, function(error){    
		if(error){
        		console.log(error.reason);//if login info correct stay on login page return console error for now
    		} else {
        		Router.go("home");//if login info correct then go to home page, change login/signup to logout
    		}	
	});
    }
});

//For event logout of Meteor user collections.
Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

}

//Creates the layout that will be common across all pages.
Router.configure({
	layoutTemplate: 'main'
});

//Creates the route to the login page. For example typing: localhost:3000/login
//will bring you to login page displaying what is in the login template.
Router.route('/login');

//Creates the route to the register page. For example typing: localhost:3000/register
//will bring you to register page displaying what is in the register template.
Router.route('/signUp');

//Creates the route to the pics page. For example typing: localhost:3000/pics
//will bring you to pics page displaying what is in the pics template.
Router.route('/pics');

//Creates the route to the news page. For example typing: localhost:3000/news
//will bring you to news page displaying what is in the news template.
Router.route('/news');

//Creates the route to the upload page. For example typing: localhost:3000/upload
//will bring you to upload page displaying what is in the upload template.
Router.route('/upload');

//Creates the route to the technology page. For example typing: localhost:3000/technology
//will bring you to technology page displaying what is in the technology template.
Router.route('/technology');

//Creates the route to the home page. Extra argument of {} and ' template:'home' '
//makes localhost:3000 display what is in the home template.
Router.route('/',{
	name: 'home',
	template: 'home'
});





