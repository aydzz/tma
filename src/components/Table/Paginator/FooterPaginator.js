import logger from "../../../base/Logger.js";

const DEFAULT_OPTIONS = {
    maximumPage: 5,
    parentUUID: null,
    prevText: "Previous",
    nextText: "Next"
}

export default class FooterPaginator{
    constructor(selector,totalCount,partitionSize,currentPage, options=DEFAULT_OPTIONS){
        this.component = null;
        this.pageButtons = [];
        this.isMounted = false;
        this.selector = selector;
        this.totalCount = totalCount;
        this.partitionSize = partitionSize;
        this.currentPage = currentPage;
        this.offset = 0;
        this.options = Object.assign(options, DEFAULT_OPTIONS);
    }

    build(){
        const buttonCount = Math.ceil(this.totalCount / this.partitionSize) >= this.options.maximumPage ? this.options.maximumPage : Math.ceil(this.totalCount / this.partitionSize);
        this.component = $.parseHTML(
            `<ul class="pagination m-0"></ul>`
        );
        this.prevBtn = $.parseHTML(
            `
            <li class="paginate_button page-item previous" id="paginator-previous-button${this.options.parentUUID ? ("-" + this.options.parentUUID ) : ""}">
                <a href="#" aria-controls="" data-index="0"  class="page-link">${this.options.prevText}</a>
            </li>
            `
        )
        this.nextBtn = $.parseHTML(
            `
            <li class="paginate_button page-item next" id="paginator-next-button${this.options.parentUUID ? ("-" + this.options.parentUUID ) : ""}">
                <a href="#" aria-controls="" data-index="${Math.ceil(this.totalCount/this.partitionSize)}" class="page-link">${this.options.nextText}</a>
            </li>
            `
        )

        $(this.component).append(this.prevBtn);

        for(let i = 1; i <= buttonCount; i++){
            const btnEl = $.parseHTML(
                `<li class="paginate_button page-item">
                    <a href="#" aria-controls="example1" data-index="${i}" tabindex="0" class="page-link">${i}</a>
                </li>`
            );
            this.pageButtons.push(btnEl)
            $(this.component).append(btnEl);
        }
        $(this.component).append(this.nextBtn);
        return this;
    }
    render(){
        const instance = this;
        /**
         * Rest of the effect
         */
        const buttonClickHandler = function(i){
            return function(e){
                e.preventDefault();
                instance.currentPage = i+1;
                logger.log("Page Button was clicked: " + instance.currentPage)
                instance.render();//rerender
            }
        }
        
        /**
         * Page button
         */
        this.pageButtons.forEach(function(button,i,arr){
            if(instance.offset === 0){
                if((i+1) === instance.currentPage){
                    if(!$(button).hasClass("active")){
                        $(button).addClass("active");
                    }
                }else{
                    if($(button).hasClass("active")){
                        $(button).removeClass("active");
                    }    
                }
                $($(button).find("a")).text(i+1);
            }else{
                if((i+1+instance.offset) === instance.currentPage){
                    if(!$(button).hasClass("active")){
                        $(button).addClass("active");
                    }
                }else{
                    if($(button).hasClass("active")){
                        $(button).removeClass("active");
                    }
                }
                $($(button).find("a")).text(i+1+instance.offset);
            }
            
            $(button).off("click");
            $(button).on("click",buttonClickHandler(i))
        })
        

        /**
         * Previous Button
         */
        if(this.currentPage === 1){
            if(!$(this.prevBtn).hasClass("disabled")){
                $(this.prevBtn).addClass("disabled");
            }
        }else{
            if($(this.prevBtn).hasClass("disabled")){
                $(this.prevBtn).removeClass("disabled");
            }
        }

        const prevButtonClickHandler = function(i){
            return function(e){
                e.preventDefault();
                if(instance.currentPage > 1){
                    instance.prev();
                    if(instance.currentPage <= instance.offset){
                        instance.offset--;
                    }
                }
                logger.log("Prev Button was clicked" + instance.currentPage);
                instance.render();//rerender;
            }
        }

        $(this.prevBtn).off("click");
        $(this.prevBtn).on("click",prevButtonClickHandler());

        /**
         * Next Button
         */
        if(this.currentPage === Math.ceil(instance.totalCount/instance.partitionSize)){
            if(!$(this.nextBtn).hasClass("disabled")){
                $(this.nextBtn).addClass("disabled");
            }
        }else{
            if($(this.nextBtn).hasClass("disabled")){
                $(this.nextBtn).removeClass("disabled");
            }
        }

        const nextButtonClickHandler = function(i){
            return function(e){
                e.preventDefault();
                if(instance.currentPage < Math.ceil(instance.totalCount/instance.partitionSize)){
                    instance.next();
                    if(instance.currentPage > instance.options.maximumPage){
                        instance.offset = instance.currentPage - instance.options.maximumPage
                    }
                }
                logger.log("Next Button was clicked" + instance.currentPage);
                instance.render();//rerender;
            }
        }

        $(this.nextBtn).off("click");
        $(this.nextBtn).on("click",nextButtonClickHandler());
        
        return this;
    }
    mount(selector){
        if(selector){
            $(selector).append(this.component);
        }else{
            if(this.selector){
                $(this.selector).append(this.component);
            }else{
                // throw new Error("Cant append Paginator to seletor: " + selector ?? this.selector);
            
            }
        }
        this.isMounted = true;
        return this;
    }
    next(callback){
        this.currentPage++;
        //some effects here...

        return this;
    }
    prev(call){
        this.currentPage--;
        //some effects here...
        
        return this;
    }
}

export const testFooterPaginator = new FooterPaginator(
    "",100,5,1
)