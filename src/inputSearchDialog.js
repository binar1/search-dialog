const { LitElement, html } = require("lit-element");
import "./TextFileds";
import "./Dialog/Dialog";
import { Get } from "./@service/HttpService";
import "./Table/Table";
class InpuDialog extends LitElement {
  static get properties() {
    return {
      mode: { type: String },
      ErrorMessage: { type: String },
      label: { type: String },
      value: { type: Object },
      PreIcon: { type: String },
      TailIcon: { type: String },
      type: { type: String },
      data: { type: Array },
      ModalStatus: { type: Boolean },
      link: { type: String },
      listOption: { type: Array },
      token:{type:String}
    };
  }

  constructor() {
    super();
    this.mode = "default";
    this.label = "Label";
    this.value = "";
    this.PreIcon = "";
    this.ErrorMessage = "";
    this.TailIcon = "";
    this.data = [];
    this.link = "";
    this.listOption = [];
    this.ModalStatus = false;
    this.token=""
  }

  OneKeyPressed({ detail },open) {
    if (detail.key === "Enter") {
      if (this.link != "") this.findByLink(detail.target.value,open);
      if(this.data.length>0) this.findByData(detail,open)
    }
  }
  

  async findByLink(value,open) {
    let link = this.link.replaceAll("value", value);
    let response = await Get(link,this.token);
    if (response.data.list.length > 0) {
      if (response.data.list.length > 1) {
        this.listOption = response.data.list;
        if(open)
        this.ModalStatus = new Boolean(true);
      } else {
        this.value = response.data.list[0];
        if(!open)
        this.ModalStatus = !this.ModalStatus;
        this.selectedItem();
      }
    }
  }

  findByData(detail,open) {
    var pattern = new RegExp(`\w*${detail.target.value}\w*`);
    let response = this.data.filter((item) => pattern.test(item.name));
    if (response.length > 0) {
      if (response.length > 1) {
        this.listOption = response;
        if(open)
        this.ModalStatus = new Boolean(true);
      } else {
        this.value = response[0];
        if(!open)
        this.ModalStatus = !this.ModalStatus;
        this.selectedItem();
      }
    }
  }

  selectedItem() {
    let myEvent = new CustomEvent("item-selected", {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(myEvent);
  }

  render() {
    return html`
      <text-field
        mode=${this.status}
        label=${this.label}
        value=${this.value.name}
        PreIcon=${this.PreIcon}
        ErrorMessage=${this.ErrorMessage}
        TailIcon=${this.TailIcon}
        .change=${(e) => {
          this.value = e;
        }}
        @customeKeyDown=${(e) => this.OneKeyPressed(e,true)}
      >
      </text-field>

      <dialog-view
        open=${this.ModalStatus}
        title="Choose Your Option"
        .BtnSecondary=${[
          {
            status: true,
            icon: "cancel",
            class: "warning",
            label: "Cancel",
            Fun: () => {},
          },
        ]}
      >
      <text-field
        mode=${this.status}
        label=${this.label}
        value=${this.value.name}
        PreIcon=${this.PreIcon}
        ErrorMessage=${this.ErrorMessage}
        TailIcon=${this.TailIcon}
        @customeKeyDown=${(e) => this.OneKeyPressed(e,false)}
      >
      </text-field>
        <table-view
          .Heads=${["ID", "Name", "Action"]}
          .RequireData=${["id", "name"]}
          .Actions=${[
            {
              label: "Select",
              key: "id",
              action: (id) => {
                let value = this.listOption.find((item) => item.id == id);
                this.value = value;
                this.ModalStatus = false;
                this.selectedItem();
              }
            },
          ]}
          .Rows=${this.listOption}
        >
        </table-view>
      </dialog-view>
    `;
  }
}

customElements.define("input-search-dialog", InpuDialog);
