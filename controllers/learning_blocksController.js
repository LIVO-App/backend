'use strict';

const learningBlockSchema = require('../models/learning_blocksModel');
const adminSchema = require('../models/adminModel')

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    notAuthorized: "Not authorized request",
    pastBlock: "You are adding a past block. Try again",
    itemAlreadyExists: "The learning blocks are all already presents",
    overlappingBlocks: "The blocks you tried to add are overlapping. Try again",
    somethingWrong: "Something went wrong",
    missingParameters: "Missing required information",
    wrongData: "The data are not correct. Please try again"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_blocks = async (req, res) => {
    let school_year = req.query.school_year;
    let year_of = req.query.year_of;
    year_of = school_year != undefined ? undefined : year_of;
    let future_block = req.query.future_block;
    future_block = future_block === "true" ? true : false;
    let blocks = await learningBlockSchema.list(school_year, year_of, future_block);
    let data_blocks = blocks.map( (block) => {
        return {
            id: block.id,
            number: block.number,
            school_year: block.school_year,
            start: block.start,
            end: block.end,
            num_groups: block.num_groups
        };
    });
    let response = {
        path: "/api/v1/learning_blocks/",
        single: true,
        query: {
            school_year: school_year,
            year_of: year_of,
            future_block: future_block
        },
        date: new Date(),
        data: data_blocks
    };
    res.status(200).json(response);
}

module.exports.get_block = async (req, res) => {
    let id = req.params.block_id;
    let school_year = req.query.school_year;
    let block = await learningBlockSchema.read(id,school_year);
    if(!block){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('single block: resource not found');
        return;
    }
    let data_block = {
        id: block.id,
        number: block.number,
        school_year: block.school_year,
        start: block.start,
        end: block.end
    };
    let response = {
        path: "/api/v1/learning_blocks/",
        single: true,
        query: {
            school_year: school_year
        },
        date: new Date(),
        data: data_block
    };
    res.status(200).json(response);
}

module.exports.get_blocks_from_courses = async (req, res) => {
    let student_id = req.query.student_id;
    let courses = req.body.courses;
    let blocks = await learningBlockSchema.list_from_list_of_courses(student_id, courses);
    if(blocks==null){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('list of block: missing list of courses');
        return;
    }
    let data_blocks = blocks.map( (block) => {
        return {
            course_id: block.course,
            block_id: block.block
        };
    });
    let response = {
        path: "/api/v1/learning_blocks/",
        single: true,
        query: {
            student_id: student_id
        },
        date: new Date(),
        data: data_blocks
    };
    res.status(200).json(response);
}

module.exports.add_blocks = async (req, res) => {
    if(req.loggedUser.role == "admin"){
        let user_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(user_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('learning blocks addition: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('learning blocks addition: unauthorized access');
        return;
    }
    let blocks_list = req.body.blocks_list;
    // Get all future blocks we have to use for control. They are ordered by starting date, so we have them in cronological order
    let future_blocks_existing = await learningBlockSchema.list(undefined, undefined, true);
    if(!future_blocks_existing){
        res.status(400).json({status: "error", description: MSG.somethingWrong});
        console.log('learning blocks addition: something went wrong in get future blocks');
        return;
    }
    future_blocks_existing.reverse()
    // Check blocks: UNIQUE number + school_year, start < end, no overlap in blocks
    // First reorder the block_list object based on school_year and starting_date
    let wrong_block, existing_block, overlapping;
    if(blocks_list!=undefined){
        blocks_list.sort((a,b) => {
            let school_year_a = a.school_year
            let school_year_b = b.school_year
            let start_date_a = new Date(a.start_date)
            let start_date_b = new Date(b.start_date)
            if(school_year_a<school_year_b){
                return -1
            }
            if(school_year_a>school_year_b){
                return 1
            }
            if(start_date_a<start_date_b){
              return -1
            }
            if(start_date_a>start_date_b){
            return 1
            }
            return 0
        })
        
        let dates_block = []
        for(let i=0;i<blocks_list.length;i++){
            let number = blocks_list[i].number;
            let school_year = blocks_list[i].school_year
            let start_date = new Date(blocks_list[i].start_date)
            let end_date = new Date(blocks_list[i].end_date)
            // If ending_date smaller than or equal to starting_date
            if(end_date<=start_date){
                console.log(`The ending date of the block ${number} of the school year ${school_year} is before the starting date. Removing the block from the list`)
                wrong_block = true
                blocks_list.splice(i,1)
                i = i-1;
                continue
            }
            // If block already exists, remove it
            let block_exists = await learningBlockSchema.read(number, school_year);
            if(block_exists){
                console.log(`The block ${number} of the school year ${school_year} you tried to add already exists. Removing the block from the list`)
                existing_block = true
                blocks_list.splice(i,1)
                i = i-1;
                continue
            }
            // Check if it is a future block and if there is a hole between them (start from the most recent one)
            let valid_block = false
            for(let j in future_blocks_existing){
                let future_block_start = new Date(future_blocks_existing[j].start)
                let future_block_end = new Date(future_blocks_existing[j].end)
                if(start_date > future_block_start){
                    if(start_date > future_block_end){
                        console.log("Block number "+number+" school year "+school_year)
                        // If we are in the most recent future block we are safe
                        // If we find a hole, it is also fine. We continue the iteration until we find the hole and then we can safely add
                        valid_block = true
                        break
                    } else {
                        console.log("Overlapping start date. Block number "+number+" school year "+school_year)
                        console.log(end_date)
                        console.log(future_block_end)
                        overlapping = true
                        res.status(400).json({status: "error", description: MSG.overlappingBlocks, wrong_block: wrong_block, existing_block: existing_block, overlapping: overlapping});
                        console.log('learning blocks addition: the blocks you wanted to add are overlapping with already existing ones. Please try again');
                        return;
                    }
                } else {
                    // Check ending date to see if it is still overlapping or not
                    if(end_date>future_block_start){
                        console.log("Overlapping end date. Block number "+number+" school year "+school_year)
                        console.log(end_date)
                        console.log(future_block_start)
                        overlapping = true
                        res.status(400).json({status: "error", description: MSG.overlappingBlocks, wrong_block: wrong_block, existing_block: existing_block, overlapping: overlapping});
                        console.log('learning blocks addition: the blocks you wanted to add are overlapping with already existing ones. Please try again');
                        return;
                    }
                }
            }
            if(!valid_block){
                overlapping = true
                res.status(400).json({status: "error", description: MSG.pastBlock, wrong_block: wrong_block, existing_block: existing_block, overlapping: overlapping});
                console.log('learning blocks addition: the blocks you wanted to add is a past block. Please try again');
                return;
            }
            // The control for the overlap with future blocks already present is successful
            // Check now with the previous ones
            for(let j = 0;j<dates_block.length;j++){
                if(start_date<=dates_block[j]){
                    overlapping = true
                    res.status(400).json({status: "error", description: MSG.overlappingBlocks, wrong_block: wrong_block, existing_block: existing_block, overlapping: overlapping});
                    console.log('learning blocks addition: the blocks you wanted to add are overlapping with each others. Please try again');
                    return;
                }
            }
            dates_block.push(start_date, end_date);
        }
    }
    
    let insert_blocks = await learningBlockSchema.add(blocks_list)
    if(!insert_blocks){
        if(existing_block && !wrong_block){
            res.status(409).json({status: "error", description: MSG.itemAlreadyExists, wrong_block: wrong_block, existing_block: existing_block, overlapping: overlapping})
            console.log('duplicated information: new learning block addition');
            return;
        } else {
            res.status(400).json({status: "error", description: MSG.missingParameters, wrong_block: wrong_block, existing_block: existing_block, overlapping: overlapping})
            console.log('missing required information: new learning block addition');
            return;
        }
    }
    let first_inserted_id = insert_blocks.insertId.toString()
    let num_inserted = insert_blocks.affectedRows
    res.status(201).json({
        status: "accepted", 
        description: "Blocks inserted", 
        wrong_block: wrong_block, 
        existing_block: existing_block, 
        overlapping: overlapping, 
        first_inserted_id: first_inserted_id, 
        num_inserted: num_inserted
    })
}

module.exports.update_block = async (req, res) => {
    if(req.loggedUser.role == "admin"){
        let user_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(user_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('learning blocks update: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('learning blocks update: unauthorized access');
        return;
    }
    let block_id = req.params.block_id
    let block_info = req.body.block_info
    let both_date = false
    let start_date = block_info!=undefined ? new Date(block_info.start_date) : undefined
    let end_date = block_info!=undefined ? new Date(block_info.end_date) : undefined
    if(block_info!=undefined){
        if(end_date != undefined && start_date != undefined){
            both_date = true
            if(end_date<=start_date){
                res.status(400).json({status: "error", description: MSG.wrongData});
                console.log('learning block update: the block has wrong data. Abort update');
                return;
            }
        } 
    }
    let block_exists = await learningBlockSchema.read(block_id)
    if(!block_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('learning block update: block does not exist');
        return;
    }
    if(!both_date){
        if(start_date!=undefined && start_date != ""){
            if(start_date>=new Date(block_exists.end)){
                res.status(400).json({status: "error", description: MSG.wrongData});
                console.log('learning block update: the block has wrong data. Abort update');
                return;
            }
        }
        if(end_date!=undefined && end_date != ""){
            if(end_date>=block_exists.start){
                res.status(400).json({status: "error", description: MSG.wrongData});
                console.log('learning block update: the block has wrong data. Abort update');
                return;
            }
        }
    }
    let starting_date = new Date(block_exists.start)
    let today = new Date()
    let _10days = today.setDate(today.getDate() + 10)
    if (starting_date <= today || starting_date <= _10days){
        res.status(400).json({status: "error", description: MSG.pastBlock});
        console.log('learning block update: the block is a past, current or imminent block. Abort update');
        return;
    }
    let future_blocks_existing = await learningBlockSchema.list(undefined, undefined, true);
    if(!future_blocks_existing){
        res.status(400).json({status: "error", description: MSG.somethingWrong});
        console.log('learning blocks update: something went wrong in get future blocks');
        return;
    }
    future_blocks_existing.reverse()
    // Check if block overlaps blocks or is changed to past block
    let overlapping, valid_block;
    if(block_info!=undefined){
        for(let j in future_blocks_existing){
            let start_date_update = start_date != undefined ? start_date : block_exists.start
            let end_date_update = end_date != undefined ? end_date : block_exists.end
            let future_block_start = new Date(future_blocks_existing[j].start)
            let future_block_end = new Date(future_blocks_existing[j].end)
            if(future_blocks_existing[j].id!=block_id){
                if(start_date_update > future_block_start){
                    if(start_date_update > future_block_end){
                        // If we are in the most recent future block we are safe
                        // If we find a hole, it is also fine. We continue the iteration until we find the hole and then we can safely add
                        valid_block = true
                        break
                    } else {
                        overlapping = true
                        res.status(400).json({status: "error", description: MSG.overlappingBlocks});
                        console.log('learning blocks update: the block you wanted to update is overlapping with already existing ones. Please try again');
                        return;
                    }
                } else {
                    // Check ending date to see if it is still overlapping or not
                    if(end_date_update>future_block_start){
                        overlapping = true
                        res.status(400).json({status: "error", description: MSG.overlappingBlocks});
                        console.log('learning blocks update: the block you wanted to update is overlapping with already existing ones. Please try again');
                        return;
                    }
                }        
                
            } else {
                if(start_date_update >= future_block_start){
                    valid_block = true
                    break
                }
            }
        }
    }
    if(!valid_block){
        overlapping = true
        res.status(400).json({status: "error", description: MSG.pastBlock});
        console.log('learning blocks update: you can\'t change a block and move it to the past. Please try again');
        return;
    }
    let update_block = await learningBlockSchema.update(block_id, block_info);
    if(!update_block){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('learning blocks update: missing parameters');
        return;
    }
    res.status(200).json({status: "updated", description: "Learning block updated successfully"})
}
/*obj.sort((a,b) => {
	let school_year_a = a.school_year
    let school_year_b = b.school_year
	let start_date_a = new Date(a.start_date)
    let start_date_b = new Date(b.start_date)
    if(school_year_a<school_year_b){
    	return -1
    }
    if(school_year_a>school_year_b){
    	return 1
    }
    if(start_date_a<start_date_b){
      return -1
    }
  	if(start_date_a>start_date_b){
    	return 1
  	}
  	return 0
    
});*/