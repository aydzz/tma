import Project from "../../base/db/models/Project.js"
import projectStatusRepo from "../../base/db/local/dal/ProjectStatusRepo.js";
import $ from "jquery";
/**
 * 
 * @param {String} selector 
 * @param {Array<Project>} array 
 */
export default function projectsTable(selector,array){
    if(array.length){
        $(selector).html("");
    }
    let htmlString = "";
    array.forEach(function(project,i,arr){
        htmlString = htmlString + tableRow(project);
    });
    console.log($.parseHTML(htmlString));
    $(selector).append($.parseHTML(htmlString));
    // document.querySelector(selector).append(
    //     // jq.parseHTML(htmlString)
    //     // stringToHTML(htmlString)
    // )
    return htmlString;
}
/**
 * 
 * @param {Project} project 
 * @returns 
 */
function tableRow(project){
    console.log(project.logo);
    const htmlStr = `
    <tr>
        <td>
            <a href="#">
                ${project.rid}
            </a>
        </td>
        <td>
            <img src="${project.logo ? project.logo : `https://avatars.dicebear.com/api/identicon/${project.rid}.svg`}" alt="Project logo" class="img-circle img-size-32 mr-2 shadow-sm">
            ${project.title}
        </td>
        <td>
            ${project.statusID ? projectStatusRepo.get(project.statusID).status : ``}
        </td>
        <td>
            ${project.createdDate ? new Date(project.createdDate).toLocaleDateString() : ``}
        </td>
        <td>
            <a href="${project.link != "" ? project.link : "#"}" class="text-muted" target="_blank">
            <i class="fas fa-globe ${project.link ? "text-success" : ""}"></i>
            </a>
        </td>
        </tr>
    `
    return htmlStr;
}