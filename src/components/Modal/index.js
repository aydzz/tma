import logger from "../../base/Logger.js";
import { v4 as uuid } from 'uuid';

const DefaultModaloptions = {
    deploy: true,
    title: "Default Modal",
    uuid: null,
    showLButton: true,
    showRButton: false
}

export default class Modal{
    constructor(selector,options){
        this.options = Object.assign(DefaultModaloptions,options);
        this.uuid = this.options.uuid ?? uuid();
        this.selector = selector;
        this.elementID = `app-modal-${this.uuid}`;
        this.elementIDSel = `#${this.elementID}`;
        this.element = null;
        this.modal = null;
        this.title = this.options.title;

        //method bindings
        this.generateModal = this.generateModal.bind(this);
        this.setElement = this.setElement.bind(this);
        this.getElement = this.getElement.bind(this);
        this.getModal = this.getModal.bind(this);
        this.deploy = this.deploy.bind(this);
        this.toggle = this.toggle.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.dispose = this.dispose.bind(this);

        if(this.options.deploy){
            this.setElement(this.generateModal())
            this.deploy(this.selector);
            this.init();
        }
    }
    generateModal(){
        const instance = this;
        const htmlStr = `
            <div class="modal fade" id="app-modal${this.uuid ? '-' + this.uuid : ""}" aria-modal="true" role="dialog" style="">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h4 class="modal-title">${this.title}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        </div>
                        <div class="modal-body">
                            <p>One fine body…</p>
                        </div>
                        <div class="modal-footer justify-content-between">
                            ${this.options.showLButton ? `<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>` : ""}
                            ${this.options.showRButton ? `<button type="button" class="btn btn-primary">Save changes</button>` : ""}
                        </div>
                    </div>
                </div>
            </div>
        `
        const modalElement = $.parseHTML(htmlStr);
        $(modalElement).find("button[data-dismiss='modal']").on("click",function(e){
            logger.log("Cancel button clicked.")
            instance.hide();
        });

        return modalElement;
    }
    setContent(element){
        $(this.elementIDSel).find(".modal-content .modal-body").html(""); //clear inner html
        $(this.elementIDSel).find(".modal-content .modal-body").append(element); // append new element in the modal content.
        return this;
    }
    setElement(element){
        this.element = element;
    }
    setTitle(title){
        $(this.elementIDSel).find(".modal-title").html(title);
        return this;
    }

    getElement(){
        return this.element;
    }
    getModal(){
        return this.modal;
    }
    deploy(selector){
        if(this.getElement()){
            if(selector){
                $(selector).append(this.getElement());
            }else{
                if(this.selector){
                    $(this.selector).append(this.getElement());
                }else{
                    logger.error("Cannot deploy modal in selector");
                    throw new Error("Cannot deploy modal in selector: " + this.selector);
                }
            }
        }else{
            logger.error("Cannot deploy modal.")
            throw new Error("Cannot deploy modal: " + this.getElement());
        }
    }
    toggle(){
        $(this.elementIDSel).modal('toggle');
    }
    show(){
        $(this.elementIDSel).modal('show');
    }
    hide(){
        $(this.elementIDSel).modal('hide');
    }
    handleUpdate(){
        $(this.elementIDSel).modal('handleUpdate');
    }
    dispose(){
        $(this.elementIDSel).modal('dispose');
    }
    init(){
        const modal =  $(`#${this.elementID}`).modal({
            keyboard: false,
            show: false,
        });
        this.modal = modal;
    }
}
