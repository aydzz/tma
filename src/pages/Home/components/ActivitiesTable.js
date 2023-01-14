import Activity from "../../../base/db/models/Activity.js";
import projectRepo from "../../../base/db/caspio/dal/ProjectRepo.js";
import $ from "jquery";
import userRepo from "../../../base/db/caspio/dal/UserRepo.js";
import logger from "../../../base/Logger.js";

export default function(selector, array){
    if(array.length){
        $(selector).html("");
    }
    let htmlString = "";
    array.forEach(function(activity,i,arr){
        htmlString = htmlString + tableRow(activity,i + 1);
    });
    $(selector).append($.parseHTML(htmlString));

    return htmlString;
}

/**
 * 
 * @param {Activity} activity 
 * @returns 
 */
const tableRow = function(activity, i){

    const htmlStr = 
    `
    <tr style="border-left: 5px solid ${projectRepo.getBy("RID",activity.projectRID).colorHex}">
        <td>
            ${i}
        </td>
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
        <td class="project-actions text-right">
            <a class="btn btn-primary btn-sm disabled" href="#">
                <i class="fas fa-folder">
                </i>
                View
            </a>
        </td>
    </tr>
    `   
    return htmlStr;
}