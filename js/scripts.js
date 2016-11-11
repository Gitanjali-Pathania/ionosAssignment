$(document).ready(function () {
    data=passwords.obj;
    var view = new MainView(data);
});

var MainView = Backbone.View.extend({
                            el: ".mainContainer",
                            signUptemplate: _.template('<div style="margin:30px"><div style="width:50%;position:absolute;top:50px"><img src="./images/ionosIcon.png" style="height:50px;width:30%"><hr><h4>Fastest way to transfer your contents in the cloud</h4><img  src="./images/ionosMap.png" style="height:200px;width:100%"></div><div style="width:50%;position:absolute;top:10%;left: 55%;"><div class="container"><div class="card card-container"><h3>Account Login</h3><input type="email" id="inputEmail" class="form-control" placeholder="User ID" required autofocus><input type="password" id="inputPassword" class="form-control" placeholder="Password" required><button class="btn btn-lg btn-primary btn-block btn-signin" id="loginId" type="submit">Log in</button></div></div></div></div>'),
                            adminTemplate:_.template('<div style="margin-top: 5%;margin-left: 30px;"><h3 class="heading">Add User : Admin</h3><div style="background-color:grey;width:90%;height:50px"><span><img src="./images/ionosIcon.png" style="height: 60%;width: 5%;display: inline;margin-top:1%;margin-left:0.7%;margin-right:1%;"><button class="btn btn-lg btn-primary btn-block" type="submit" id="addUser" style="bottom: 20%;height:30px;width:80px;border-radius: 20px;display:inline">Add User</button><button class="btn btn-lg btn-primary btn-block" type="submit" id="viewUser" style="bottom: 20%;height:30px;width:100px;border-radius: 20px;display:inline">View Users</button><button class="btn btn-lg btn-primary btn-block" type="submit" id="signOut" style="bottom: 20%;height:30px;width:80px;border-radius: 20px;display:inline">Sign Out</button><span></div><div class="subView"><div style="margin:30px"><input type="email" id="email" class="form-control Adduser" placeholder="User ID" ><input type="password" id="password" class="form-control Adduser" placeholder="Password"><input type="text" id="firstName" class="form-control Adduser" placeholder="First Name"><input type="text" id="lastName" class="form-control Adduser" placeholder="Last Name"><button class="btn btn-lg btn-primary btn-block" type="submit" id="add" style="height:30px;width:80px;border-radius: 20px;">Add User</button></div></div></div>'),
                            userTemplate:_.template('<div style="margin-top:5%;margin-left: 30px;"><h3>My Profile : User</h3><div style="background-color:grey;width:90%;height:50px"><span><img src="./images/ionosIcon.png" style="height:60%;width:5%;display: inline;margin-top:1%;margin-left:0.7%;margin-right:1%;"><button class="btn btn-lg btn-primary btn-block" type="submit" style="bottom: 20%;height:30px;width:80px;border-radius: 20px;display:inline">My Profile</button><button class="btn btn-lg btn-primary btn-block" type="submit" id="signOut" style="bottom: 20%;height:30px;width:80px;border-radius: 20px;display:inline">Sign Out</button><span></div><div style="margin:30px"><h2>My Profile</h2><fieldset style="width: 30%;margin-right:5%;height: 10%;display:inline;margin-bottom:10px"><legend>User ID</legend><input type="text" style="margin-top:-2px;font-size:12px" id="updateEmail"></fieldset><fieldset style="width: 30%;margin-right:5%;height: 10%;display:inline;margin-bottom:10px"><legend>Password</legend><input type="text" style="margin-top:-2px;font-size:12px" id="updatePassword"></fieldset> <br><fieldset style="width: 30%;margin-right:5%;height: 10%;display:inline;margin-bottom:10px"><legend>First Name</legend><input  type="text" style="margin-top:-2px;font-size:12px" id="updateFirstname"></fieldset><fieldset style="width: 30%;margin-right:5%;height: 10%;display:inline;margin-bottom:10px"><legend>Last Name</legend><input type="text"  style="margin-top:-2px;font-size:12px" id="updateLastname"></fieldset><button class="btn btn-lg btn-primary btn-block" type="submit" id="update" style="height:30px;width:80px;border-radius: 20px;">Update</button></div></div>'),
                            passwordObj:null,
                            currentUser:null,
                            initialize: function(_) {
                                var self = this;
                                self.passwordObj=_;
                                this.render();
                            },
                            events:{
                                            'click #signOut':'SignOutFun',
                                             'click #loginId':'loginFun',
                                            'click #addUser':'addUserFun',
                                            'click #viewUser':'viewUserFun',
                                            'click #add':'addFun',
                                            'click #update':'updateFun'

                            },
                            loginFun:function(){
                                var self=this;
                                var email=document.getElementById('inputEmail').value;
                                var password=document.getElementById('inputPassword').value;
                                if(email==self.passwordObj[0].username && password== self.passwordObj[0].password){
                                          this.$el.html(self.adminTemplate());
                                }
                                else{
                                          var userDetails=self.passwordObj;
                                          userDetails.forEach(function(d){
                                          if(d.username==email && d.password==password){
                                          self.currentUser=d.firstName;
                                          self.$el.html(self.userTemplate());
                                          $("#updateEmail").val(d.username);
                                          $("#updatePassword").val(d.password);
                                          $("#updateFirstname").val(d.firstName);
                                          $("#updateLastname").val(d.lastName);
                                        }
                                    })
                                }  
                            },
                            SignOutFun:function(){
                              var self=this;
                              this.$el.html(self.signUptemplate());
                            },
                            updateFun:function(){
                               var  self=this,userDetails=self.passwordObj,flag=false,
                                    email=document.getElementById('updateEmail').value,
                                    password=document.getElementById('updatePassword').value,
                                    fname=document.getElementById('updateFirstname').value,
                                    lname=document.getElementById('updateLastname').value;
                                    userDetails.forEach(function(d){
                                    if(d.firstName==self.currentUser){
                                        d.username=email;
                                        d.password=password;
                                        d.firstName=fname;
                                        d.lastName=lname;
                                        flag=true;
                                      }
                                    })
                                    if(flag){
                                        self.passwordObj=userDetails;
                                        alert("Record updated!");
                                    }
                            },
                            addUserFun:function(){
                                var self=this;
                                $('.heading').html('Add User : Admin');
                                this.$el.html(self.adminTemplate());
                            },
                            viewUserFun:function(){
                                var self=this,templateStr='',userDetails=self.passwordObj;
                                    userDetails.forEach(function(d){
                                    if(d.firstName){
                                        templateStr+='<tr><td id="Temail">'+d.username+'</td><td id="Tfname">'+d.firstName+'</td><td id="Tlname">'+d.lastName+'</td><td id="Tpwd">'+d.password+'</td></tr>';
                                    }
                                    $('.subView').html('<div style="margin:30px"><table class="w3-table-all w3-hoverable" style="height:30px;width:90%"><thead><th align="left"> User ID</th><th align="left"> First Name</th><th align="left"> Last Name</th><th align="left"> Password</th></thead><tbody id="tbody"></tbody></table></div>');
                                    $('#tbody').html(templateStr);
                                    $('.heading').html('View User : Admin');
                                    })
                            },
                             addFun:function(){
                                var self=this,newUser,
                                    email=document.getElementById('email').value,
                                    password=document.getElementById('password').value,
                                    fname=document.getElementById('firstName').value,
                                    lname=document.getElementById('lastName').value;
                                    if(email && password && fname && lname){
                                      newUser={ "username": email,"password": password,"firstName": fname,"lastName": lname};
                                      self.passwordObj.push(newUser);
                                      alert("New User  '"+fname+"'   Added !");
                                      document.getElementById('email').value='';
                                      document.getElementById('password').value='';
                                      document.getElementById('firstName').value='';
                                      document.getElementById('lastName').value='';
                                    }
                            },
                            render: function() {
                              this.$el.html(this.signUptemplate());
                                return this;
                            }
});

