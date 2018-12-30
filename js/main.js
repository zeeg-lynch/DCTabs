new Vue({
	el: '#app',
	data: {
		title: "HW",
		selectedLink: " ",
		newTabName: "",
		newTabLink: "",
		tabs: [
			{name: "Take A Look Around", link: "https://tabs.ultimate-guitar.com/tab/limp_bizkit/take_a_look_around_tabs_9751"},
			{name: "The Unforgiven", link: "https://tabs.ultimate-guitar.com/tab/metallica/the_unforgiven_tabs_74957"}
		],
		exportedTabs: "",
		checked_id: "",
		addActive: false,
		exportFieldIsVisible: false
	},
	mounted() {
	    if (localStorage.tabs) {
	      try {
	        this.tabs = JSON.parse(localStorage.getItem('tabs'));
	      } catch(e) {
	        localStorage.removeItem('tabs');
	      }
	    }
    },
	watch: {
	    tabs(newTabs) {
	    	console.log("watch triggered");	        
	    }
	},
	computed: {
		exportedTabsIsNull: function() {
			return this.exportedTabs==="";
		}
	},
	methods: {
		updateSelectedLink(link) {
			console.log("updateSelectedLink invoked. Link is " + link);
			if (link!="") {
				this.selectedLink = link;
			}
			console.log("selectedLink is " + this.selectedLink);
		},

		addTab: function() {			
			if (this.newTabName!="") {
				this.tabs.push({name:this.newTabName,link:this.newTabLink});
				this.newTabName="";
				this.newTabLink="";
			}	
			this.addActive=!this.addActive;			
			// this.saveToLocalStorage();
		},

		exportTabs: function() {
			console.log("EXPORT: " + this.exportedTabs);
			this.exportedTabs = JSON.stringify(this.tabs);				
			this.exportFieldIsVisible=true;
		},

		importTabs: function() {
			if (this.exportedTabs!="") {
				this.tabs = JSON.parse(this.exportedTabs);
			}
		},

		saveTabs: function() {
			localStorage.tabs = JSON.stringify(this.tabs);
		},

		toggleExportVisibility() {
			this.exportFieldIsVisible=!this.exportFieldIsVisible
		},

		setChecked: function(e) {
			var checkedId = e.target.id;
			console.log(checkedId);
			if (this.checked_id != checkedId) {
				this.checked_id = checkedId;				
			}
			else {
				this.checked_id = '';
				localStorage.tabs = JSON.stringify(this.tabs);
			}
		},

		removeTab: function(tab) {
			this.tabs.splice(this.tabs.indexOf(tab));
		},

		moveUp: function(tab) {
			var index = this.tabs.indexOf(tab);
			if (index===0) {
				return;
			}
			else {
				var tmp = this.tabs[index];
				this.tabs[index] = this.tabs[index-1];
				this.tabs[index-1] = tmp;
			}
			this.$forceUpdate(); //ugly hack, have to solve it with key=item.id for iterables	
		},

		moveDown: function(tab) {
			var index = this.tabs.indexOf(tab);
			if (index===this.tabs.length-1) {
				return;
			}
			else {
				var tmp = this.tabs[index];
				this.tabs[index] = this.tabs[index+1];
				this.tabs[index+1] = tmp;
			}
			this.$forceUpdate(); //ugly hack, have to solve it with key=item.id for iterables	
		}


	}
});
