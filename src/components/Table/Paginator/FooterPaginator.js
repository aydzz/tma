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
        this.selector = selector;
        this.totalCount = totalCount;
        this.partitionSize = partitionSize;
        this.currentPage = currentPage;
        this.options = Object.assign(options, DEFAULT_OPTIONS);
    }

    build(){
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

        for(let i = 1; i <= Math.ceil(this.totalCount / this.partitionSize); i++){
            const btnEl = $.parseHTML(
                `
                <li class="paginate_button page-item">
                    <a href="#" aria-controls="example1" data-index="${i}" tabindex="0" class="page-link">${i}</a>
                </li>
                `
            );
            this.pageButtons.push(btnEl)
            $(this.component).append(btnEl);
        }
        $(this.component).append(this.nextBtn);
        return this;
    }
    init(){
        $(this.pageButtons[this.currentPage - 1]).addClass("active");
        if(this.currentPage === 1){
            $(this.prevBtn).addClass("disabled")
        }
        return this;
    }
    append(selector){
        if(selector){
            $(selector).append(this.component);
        }else{
            if(this.selector){
                $(this.selector).append(this.component);
            }else{
                throw new Error("Cant append Paginator to seletor: " + selector ?? this.selector);
            }
        }
        return this;
    }
}

export const testFooterPaginator = new FooterPaginator(
    "",20,5,1
)