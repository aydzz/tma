import Activity from "../../../base/db/models/Activity.js";
import projectRepo from "../../../base/db/caspio/dal/ProjectRepo.js";
import $ from "jquery";
import userRepo from "../../../base/db/caspio/dal/UserRepo.js";
import logger from "../../../base/Logger.js";
import moment from "moment";
import application from "../../../base/index.js";
const DEFAULT_TABLE_OPTIONS = {
    showIndex: true,
    showActions: false
}
const DEFAULT_ROW_OPTIONS = {
    rowIndex: null,
    showIndex: true,
    showActions: false
    
} 
export default function(selector, array, options){
    if(array.length){
        $(selector).html("");
    }
    const opts = Object.assign(DEFAULT_TABLE_OPTIONS, options);

    const rowOpts = {
        showIndex: opts.showIndex,
        showActions: opts.showActions
    }

    let htmlString = "";
    array.forEach(function(activity,i,arr){
        rowOpts["rowIndex"] = i + 1
        htmlString = htmlString + tableRow(activity,rowOpts);

        const rowEl = $.parseHTML(tableRow(activity,rowOpts))

        /**
         * Binding View Activity Click Handler
         */
        $(rowEl).children("td.row-actions").children("[data-action-type='view']").on("click",function(e){
            viewActClickHandler(e,activity);
        })
        $(selector).append(rowEl);
    });
    return htmlString;
}

/**
 * 
 * @param {Activity} activity 
 * @returns 
 */
const tableRow = function(activity, options){
    const opts = Object.assign(DEFAULT_ROW_OPTIONS,options);

    const htmlStr = 
    `
    <tr style="border-left: 5px solid ${projectRepo.getBy("RID",activity.projectRID).colorHex}">
        ${opts.showIndex ? 
            `<td>
                ${opts.rowIndex}
            </td>` : '' // @TODO: handle this later
        }
        <td>
            <a>
                ${projectRepo.getBy("RID",activity.projectRID).title}
            </a>
            <br>
            <small>
                Created ${projectRepo.getBy("RID",activity.projectRID).createdDate}
            </small>
        </td>
        <td>
            <ul class="list-inline">
                <li class="list-inline-item">
                    <img alt="Avatar" class="table-avatar" src="${userRepo.getBy("RID",activity.createdByUserRID).profileImage}" width="50px"> ${userRepo.getBy("RID",activity.createdByUserRID).fxFullname}
                </li>
            </ul>
        </td>
        <td class="project_progress">
            
            <p>
                ${activity.date}
            </p>
        </td>
        <td class="project-state">
            <span class="badge badge-primary">${activity.value} mins</span>
        </td>
        ${
            opts.showActions ? `
            <td class="row-actions text-right" data-activity-rid='${activity.rid}'>
                <button class="btn btn-primary btn-sm view-btn" data-action-type='view'>
                    <i class="fas fa-folder">
                    </i>
                    View
                </a>
            </td>
            ` : '' // @TODO: handle this later
        }
    </tr>
    `   
    return htmlStr;
}

/**
 * 
 * @param {Activity} activity 
 * @param {Object} options 
 */
const activityModalContent = function(activity, options){
    const user = userRepo.getBy("RID",activity.createdByUserRID);
    const project = projectRepo.getBy("RID", activity.projectRID);
    const htmlStr = `
    <div class="box-profile">
        <div class="text-center">
            <img class="profile-user-img img-fluid img-circle" src="${user.profileImage}" alt="User profile picture">
        </div>
        <h3 class="profile-username text-center">${user.fxFullname}</h3>

        <p class="text-muted text-center">${user.publicID}</p>

        <ul class="list-group list-group-unbordered mb-3">
           
            <li class="list-group-item">
            <b>Project</b> <a class="float-right"><span class='badge' style='background-color: ${project.colorHex}; color:#fff'>${project.title}</span></a>
            </li>
            <li class="list-group-item">
                <b>Title</b> <span class="float-right">${activity.title}</span>
            </li>
            <li class="list-group-item">
                <b>Value</b> <a class="float-right"><span class='badge badge-secondary'>${activity.value} mins</span></a>
            </li>
        </ul>
        <strong><i class="far fa-file-alt mr-1"></i> Notes</strong>
        <p class="text-muted">${activity.details === "" ? "-" : activity.details }</p>
    </div>
    `
    return $.parseHTML(htmlStr);
}

/**
 * 
 * @param {*} e 
 * @param {Activity} activity 
 */
const viewActClickHandler = function(e,activity){
    logger.log("View Button was clicked for ID: " + activity.rid);
    application.appModal.setContent(activityModalContent(activity)).setTitle(`Activity - ${activity.rid}`).show();
}