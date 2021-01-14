import { css, html, LitElement } from "lit-element";
import "@material/mwc-dialog";
import { connect } from "pwa-helpers";
import { store } from "../../redux/store";
import { getAvailableLangSelector } from "../../redux/reducer";

class DeleteDialog extends connect(store)(LitElement) {
  static get properties() {
    return {
      open: { type: Boolean },
      key: { type: String },
      BtnPrimaryFun: { type: Function },
      Dic: { type: Object },
      mode:{type:String},
      Message:{type:String},
      Title:{type:String}
    };
  }

  static get styles() {
    return css`
      .danger {
        --mdc-theme-primary: #d9534f;
        --mdc-theme-on-primary: #fff;
      }
      .success {
        --mdc-theme-primary: #5cb85c;
        --mdc-theme-on-primary: #fff;
      }
      .warning {
        --mdc-theme-primary: #f0ad4e;
        --mdc-theme-on-primary: #fff;
      }
      .text-success{
        color: #5cb85c
      }
      .text-danger{
        color: #d9534f
        }
      .text-warning{
          color: #f0ad4e
      }
    `;
  }
  constructor() {
    super();
    this.open = false;
    this.key = null;
    this.Dic = {};
    this.mode="danger"
    this.Message="Are you Sure"
    this.Title="Delete"
  }

  stateChanged(state) {
    this.Dic = getAvailableLangSelector(state);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "open") {
      this.open = newValue == "true";
      const dialog = this.shadowRoot.querySelector("#dialog");
      if (dialog != null) dialog.open = true;
    }
    if (name == "key") this.key = newValue;
  }

  getTextColor(key){
    switch (key) { 
      case 'danger':
        return 'text-danger'
      case 'warning': 
      return 'text-warning'
      case 'success': 
      return 'text-success'
      default:
        return 'text-danger'
    }
  }

  render() {
    return html`
      <mwc-dialog id="dialog" heading=${this.Dic[this.Title]}>
        <h2 class=${this.getTextColor(this.mode)}>${this.Dic[this.Message]}</h2>
        <mwc-button
          slot="primaryAction"
          dialogAction="ok"
          icon="delete"
          class=${this.mode}
          raised
          @click=${() => this.BtnPrimaryFun(this.key,this.mode)}
          >${this.Dic["Yes"]}</mwc-button
        >
        <mwc-button slot="secondaryAction" icon="cancel" dialogAction="ok"
          >${this.Dic["Cancel"]}</mwc-button
        >
      </mwc-dialog>
    `;
  }
}

customElements.define("delete-dialog-view", DeleteDialog);
