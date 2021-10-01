var router = require('express').Router();
const Timers = require('../models/timers');

// import middleware functions here
// var logUserAction = middlewares.logUserAction;
  
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const timer = await Timers.fetchTimer(id);

    return res.json({
        'status' : 'success',
        'timer' : timer
    });
});

router.get('/', async (req, res) => {
    const { timers, count } = await Timers.fetchTimers();

    return res.json({
        'status' : 'success',
        'timers' : timers,
        'count' : count
    });
});

router.post('/', async (req, res) => {
    const name = req.body.name;
    const timer = await Timers.createTimer(name);

    return res.json({
        'status' : 'success',
        'timer' : timer
    });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const timer = await Timers.updateTimer(id, status);

    return res.json({
        'status' : 'success',
        'timer' : timer
    });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const response = await Timers.deleteTimer(id);

    return res.json({
        'status' : 'success'
    });
});


// "attributes", "related_lists" are both an array
// router.post('/update', ensureLoggedIn, logUserAction, function (req, res) {
//     var user_id = req.session.passport.user.user_id;
//     var list_id = req.body.list_id;
//     var updated_list_content = req.body.updated_list;

//     var updatable_fields = ["is_public","is_spam","description","list_name","tags","attributes", "related_lists", "list_layout", "sponsors", "list_theme_dark", "list_theme_light", "list_heading", "list_image_url", "custom_cta_url"];
//     var refined_updated_list = Helpers.keepUpdatableFields(updatable_fields, updated_list_content);

//     return Lists.fetchListInfo(list_id).then(function(list_data){
//         if (list_data.author_id == user_id){

//             const cleanText = Stopword.removeStopwords(list_data["list_name"].split(" ")).join(" ");
//             const list_slug = Slugify(cleanText, { replacement: '-', lower: true, remove: /[*+~.()'"!:@#/]/g });

//             list_data["list_slug"] = list_slug;
            
//             return Lists.updateList(list_id, refined_updated_list).then(function(updated_list){
//                 return res.json({
//                     "status" : "success",
//                     "list" : updated_list
//                 });
//             }).catch(function(error){
//                 throw new Error(error.toString())
//             })
//         }
//         else{
//             throw new Error("One can only change what one does.")
//         }
//     }).catch(function(error){
//         return res.json({
//             "status" : "fail", 
//             "error" : {
//                 "message" : error.toString()
//             } 
//         });
//     })
// })

module.exports = router;
