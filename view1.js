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
		this.$('.update').show();
		this.$('.cancel').show();

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



var BlogsView = Backbone.View.extend({                         // view for collection
	model: blogs,
	el: $('.blogs-list'),
	
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', this.render , this);
		this.model.on('remove', this.render, this);
	},
	
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog) {
			self.$el.append((new BlogView({model: blog})).render().$el);
		});
		return this;
	}
});

var blogsView = new BlogsView();

$(document).ready(function() {
	$('.add').on('click', function() {
		
		
		var blog = new Blog({
			Name: $('.Name-input').val(),
			Description: $('.Description-input').val(),      // Passing values in model
			Date: $('.Date-input').val(),
			Status: $('.Status-input').val(),
		});
		
		$('.Name-input').val('');
		$('.Description-input').val('');                      // Remove entry from Text field
		$('.Date-input').val('');
		$('.Status-input').val('');
		
		blogs.add(blog);                                      // passing model to collection
	})
})
