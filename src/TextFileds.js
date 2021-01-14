const { LitElement, html, css } = require("lit-element");
import "@material/mwc-formfield";
import "@material/mwc-textfield";
class TextField extends LitElement {
  static get properties() {
    return {
      mode: { type: String },
      change: { type: Function },
      ErrorMessage: { type: String },
      label: { type: String },
      value: { type: String },
      PreIcon: { type: String },
      TailIcon: { type: String },
      type: { type: String },
      disable: { type: Boolean },
    };
  }

  static get styles() {
    return [
      css`
        .Error {
          --mdc-text-field-idle-line-color: #f00;
          --mdc-text-field-outlined-idle-border-color: #f00;
          --mdc-text-field-fill-color: #f00;
        }
        .Success {
          --mdc-text-field-idle-line-color: #0f0;
          --mdc-text-field-outlined-idle-border-color: #0f0;
        }

        .default {
          --mdc-text-field-outlined-idle-border-color: rgba(0, 0, 0, 0.38);
          --mdc-text-field-idle-line-color: rgba(0, 0, 0, 0.42);
        }

        .w-100 {
          width: 100%;
          margin: 10px 0px;
        }

        .disable {
          --mdc-text-field-disabled-ink-color: #000;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.mode = "default";
    this.change = () => {};
    this.label = "Label";
    this.value = "";
    this.PreIcon = "";
    this.ErrorMessage = "";
    this.TailIcon = "";
    this.disable = false;
  }

  onKeyPressDown(e){
    let myEvent = new CustomEvent("customeKeyDown", {
      detail:e,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(myEvent);
  }

  render() {
    return html`
      ${this.mode == "Error"
        ? html`<span style="color:#f00;font-size:12px"
            >*${this.ErrorMessage}</span
          >`
        : null}
      ${this.disable == true
        ? html` <mwc-textfield
            class="w-100  disable ${this.mode}"
            outlined
            disabled
            label=${this.label}
            type=${this.type == "undefined" ? "text" : this.type}
            icon=${this.PreIcon}
            value=${this.value == "undefined" || this.value == "null"
              ? ""
              : this.value}
            @change=${(e) => {
              this.change(e);
            }}
            @keydown=${(e)=>this.onKeyPressDown(e)}
          ></mwc-textfield>`
        : html`
            <mwc-textfield
              class="w-100 ${this.mode}"
              outlined
              label=${this.label}
              type=${this.type == "undefined" ? "text" : this.type}
              icon=${this.PreIcon}
              value=${this.value == "undefined" || this.value == "null"
                ? ""
                : this.value}
              @change=${(e) => {
                this.change(e.srcElement.value);
              }}
              @keydown=${(e)=>this.onKeyPressDown(e)}
            ></mwc-textfield>
          `}
    `;
  }
}

customElements.define("text-field", TextField);
