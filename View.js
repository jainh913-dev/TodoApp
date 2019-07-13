
// passing values in collection from input using JQuery


$(document).ready(function() {
	$('.add').on('click', function() {
		
		
// validation for empty fields after add button event
		
			  var textN = $(".Name-input").val();
			  var textD = $(".Description-input").val();
			  var textDa = $(".Date-input").val();
			  var textS = $(".Status-input").val();
			  if(textN == "" || textD == "" || textDa == "" || textS == "") {
			    alert('All field are required please fill the field');
			    return false;
			  }
			  
			  
// passing values to model
		
		
			var blog = new Blog({
			Name: $('.Name-input').val(),
			Description: $('.Description-input').val(),                
			Date: $('.Date-input').val(),
			Status: $('.Status-input').val(),
		});
		
		
// This will empty text field once we click on add button
		
		
		$('.Name-input').val('');
		$('.Description-input').val('');                      
		$('.Date-input').val('');
		$('.Status-input').val('');
		
		
		// passing model to collection
		
		blogs.add(blog);                                  
	});
});


//view for collection to iterate model by each function


var BlogsView = Backbone.View.extend({                       
	
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.model.on('remove', this.render, this);
	},
	

// append value on dom of view
	
	render: function() {
		var self = this;
		this.$el.html('');
		this.model.each(function(blog){
			self.$el.append((new BlogView({model: blog})).render().$el);
		});
		return this;
	}
});

 
// instantiation of view


var blogsView = new BlogsView({el: $('.blogs-list') , model: blogs});
blogsView.render();



// view for model


var BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.blogs-list-template').html());
	},
	
	
	events: {
		'click .edit': 'edit',
		'click .update': 'update',
		'click .cancel': 'cancel',
		'click .delete': 'delete'
	},
	
	
	edit: function() {
		$('.edit').hide();
		$('.delete').hide();
		$('.update').show();
		$('.cancel').show();

		var Name = this.$('.Name').html();
		var Description = this.$('.Description').html();
		var Date = this.$('.Date').html();
		var Status = this.$('.Status').html();

		this.$('.Name').html('<input type="text" class="form-control Name-update" value="' + Name + '">');
		this.$('.Description').html('<input type="text" class="form-control Description-update" value="' + Description + '">');
		this.$('.Date').html('<input class="form-control Date-update" value="' + Date + '">');
		this.$('.Status').html('<select name="status" class="form-control Status-update" value="' + Status + '"> <option value="Complete">Complete</option> <option value="Incomplete">Incomplete</option> </select>');
	},
	
	
	
	update: function() {
		
// validation for empty field before update event 		
		
		
		  var textN1 = $(".Name-update").val();
		  var textD1 = $(".Description-update").val();
		  var textDa1 = $(".Date-update").val();
		  var textS1 = $(".Status-update").val();
		  if(textN1 == "" || textD1 == "" || textDa1 == "" || textS1 == "") {
		  alert('All field are required please fill the field');
		  return false;
		  }
		  
		  
		this.model.set('Name', $('.Name-update').val());
		this.model.set('Description', $('.Description-update').val());
		this.model.set('Date', $('.Date-update').val());
		this.model.set('Status', $('.Status-update').val());
	},
	
	
	cancel: function() {
		blogsView.render();
	},
	
	delete: function() {
		this.model.destroy();
	},
	
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});
