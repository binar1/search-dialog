import { css, html, LitElement } from "lit-element";
import "@material/mwc-dialog";

class Dialog extends LitElement {
  static get styles() {
    css`
      #dialog {
        --mdc-dialog-max-width: 1000px;
        --mdc-dialog-min-width: 1000px;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      open: { type: Boolean },
      BtnPrimary: { type: Array },
      BtnSecondary: { type: Array },
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "open") {
      this.open = newValue == "true";
      const dialog = this.shadowRoot.querySelector("#dialog");
      if (dialog != null) dialog.open=newValue=="true";
    }

    if (name == "btnprimary") this.BtnPrimary = JSON.parse(newValue);
    if (name == "btnsecondary") this.BtnSecondary = JSON.parse(newValue);
    if (name == "title") this.title = newValue;
  }

  constructor() {
    super();
    this.title = "";
    this.open = false;
    this.BtnPrimary = [];
    this.BtnSecondary = [];
  }

  render() {
    return html`
      <mwc-dialog id="dialog" heading="${this.title}">
        <slot></slot>
        
        <div slot="primaryAction">
          ${this.BtnPrimary.map((item) => {
            
           return html`
              ${item.status == true
                ? html` <mwc-button
                    dialogAction="ok"
                    icon=${item.icon}
                    raised
                    class=${item.class}
                    @click=${() => item.Fun()}
                    >${item.label}</mwc-button
                  >`
                : null}
            `;
          })}
        </div>

        <div slot="secondaryAction">
          ${this.BtnSecondary.map((item) => {
           return  html`
              ${item.status == true
                ? html` <mwc-button
                slot="secondaryAction"
                icon=${item.icon}
                class=${item.class}
                dialogAction="ok"
                @click=${() => item.Fun()}
                >${item.label}</mwc-button
              >`
              : null}
            `;
          })}
        </div>
      </mwc-dialog>
    `;
  }
}

customElements.define("dialog-view", Dialog);
