import React from "react";
import unexpected from "test/expect";
import unexpectedDom from "unexpected-dom";
import sinon from "sinon";
import Menu from "./";
import Button from "../Button";
import RelativePositionedPopup from "../core/RelativePositionedPopup";

describe("Menu", () => {
  const expect = unexpected
    .clone()
    .use(unexpectedDom)
    .addAssertion(
      "<ReactElement> when clicking on the trigger <assertion?>",
      (expect, subject) =>
        expect(
          subject,
          "when deeply rendered",
          "with event",
          "click",
          "on",
          <Button>trigger</Button>
        )
          .delay(0)
          .then(subject => {
            expect.errorMode = "bubble";
            expect.shift(subject);
          })
    )
    .addAssertion(
      "<DOMNode> to have html <string>",
      (expect, subject, value) => {
        expect(
          subject,
          "to satisfy",
          value.replace(/^\s+/gm, "").replace(/\s*\n/gm, "")
        );
      }
    )
    .addAssertion(
      "<RenderedReactElement> to have rendered menu <string>",
      (expect, subject, value) => {
        expect.errorMode = "bubble";
        if (!subject.props.testId) {
          expect.fail("Please specify a testId on the menu");
        }

        expect(
          document.body,
          "queried for first",
          `[data-test-id=${subject.props.testId}-popup]`,
          "to have html",
          value
        );
      }
    );

  /**
   * Must remove stale menus that are appended to body during testing.
   * These are removed correctly in non-testing environments.
   */
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("with menu items", () => {
    it("renders a menu containing the items", () =>
      expect(
        <Menu trigger={<Button>trigger</Button>} testId="my-menu">
          <Menu.Item>One</Menu.Item>
          <Menu.Item>Two</Menu.Item>
          <Menu.Item>Three</Menu.Item>
        </Menu>,
        "when clicking on the trigger",
        "to have rendered menu",
        `<div>
           <div role="menu">
             <div>
               <div role="menuitem">One</div>
               <div role="menuitem">Two</div>
               <div role="menuitem">Three</div>
             </div>
           </div>
         </div>`
      ));
  });

  describe("when clicking on the trigger the menu becomes visible", () => {
    it("renders a menu that is not hidden", () =>
      expect(
        <Menu trigger={<Button>trigger</Button>} testId="my-menu">
          <Menu.Item>One</Menu.Item>
          <Menu.Item>Two</Menu.Item>
          <Menu.Item>Three</Menu.Item>
        </Menu>,
        "when clicking on the trigger",
        "to have rendered menu",
        `<div style="visibility: visible">
           <div role="menu">
             <div>
               <div role="menuitem">One</div>
               <div role="menuitem">Two</div>
               <div role="menuitem">Three</div>
             </div>
           </div>
         </div>
        `
      ));
  });

  describe("when specifying margins", () => {
    it("the margins are delegated to the popup", () =>
      expect(
        <Menu
          trigger={<Button>trigger</Button>}
          marginBottom={0}
          marginLeft={0}
          marginRight={0}
          marginTop={0}
        >
          <Menu.Item>One</Menu.Item>
          <Menu.Item>Two</Menu.Item>
          <Menu.Item>Three</Menu.Item>
        </Menu>,
        "when clicking on the trigger",
        "to contain",
        <RelativePositionedPopup
          hidden={false}
          marginBottom={0}
          marginLeft={0}
          marginRight={0}
          marginTop={0}
        >
          {position => {}}
        </RelativePositionedPopup>
      ));
  });

  describe("a separator", () => {
    it("renders a menu containing a separator", () =>
      expect(
        <Menu trigger={<Button>trigger</Button>} testId="my-menu">
          <Menu.Item>One</Menu.Item>
          <Menu.Item>Two</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Three</Menu.Item>
        </Menu>,
        "when clicking on the trigger",
        "to have rendered menu",
        `<div>
           <div role="menu">
             <div>
               <div role="menuitem">One</div>
               <div role="menuitem">Two</div>
               <div role="separator" class="separator"></div>
               <div role="menuitem">Three</div>
             </div>
           </div>
         </div>`
      ));
  });

  describe("with arrows enabled", () => {
    it("renders an menu with an arrow", () =>
      expect(
        <Menu
          arrow
          positioning="bottom"
          trigger={<Button>trigger</Button>}
          testId="my-menu"
        >
          <Menu.Item>One</Menu.Item>
          <Menu.Item>Two</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Three</Menu.Item>
        </Menu>,
        "when clicking on the trigger",
        "to have rendered menu",
        `<div>
           <div class="menu arrow_top" role="menu">
             <div>
               <div role="menuitem">One</div>
               <div role="menuitem">Two</div>
               <div role="separator" class="separator"></div>
               <div role="menuitem">Three</div>
             </div>
           </div>
         </div>
        `
      ));
  });

  describe("given a size", () => {
    it("renders a menu with that size", () =>
      expect(
        <Menu size="large" trigger={<Button>trigger</Button>} testId="my-menu">
          <Menu.Item>One</Menu.Item>
          <Menu.Item>Two</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Three</Menu.Item>
        </Menu>,
        "when clicking on the trigger",
        "to have rendered menu",
        `<div>
          <div class="menu size_large" role="menu">
            <div>
              <div role="menuitem">One</div>
              <div role="menuitem">Two</div>
              <div role="separator" class="separator"></div>
              <div role="menuitem">Three</div>
            </div>
          </div>
        </div>
        `
      ));
  });

  describe("with a max height", () => {
    describe("that is a number", () => {
      it("makes the item list scrollable and set a max height", () =>
        expect(
          <Menu
            trigger={<Button>trigger</Button>}
            maxHeight={150}
            testId="my-menu"
          >
            <Menu.Item>One</Menu.Item>
            <Menu.Item>Two</Menu.Item>
            <Menu.Item>Three</Menu.Item>
          </Menu>,
          "when clicking on the trigger",
          "to have rendered menu",
          `<div>
            <div class="menu" role="menu" style="max-height: 150px">
              <div>
                <div role="menuitem">One</div>
                <div role="menuitem">Two</div>
                <div role="menuitem">Three</div>
              </div>
            </div>
          </div>
          `
        ));
    });

    describe("that is a string", () => {
      it("makes the item list scrollable and set a max height", () =>
        expect(
          <Menu
            trigger={<Button>trigger</Button>}
            maxHeight={"80vh"}
            testId="my-menu"
          >
            <Menu.Item>One</Menu.Item>
            <Menu.Item>Two</Menu.Item>
            <Menu.Item>Three</Menu.Item>
          </Menu>,
          "when clicking on the trigger",
          "to have rendered menu",
          `<div>
            <div class="menu" role="menu" style="max-height: 80vh">
              <div>
                <div role="menuitem">One</div>
                <div role="menuitem">Two</div>
                <div role="menuitem">Three</div>
              </div>
            </div>
          </div>
          `
        ));
    });
  });

  describe("with fixedWidth", () => {
    it("renders a menu with fixed width", () =>
      expect(
        <Menu fixedWidth trigger={<Button>trigger</Button>} testId="my-menu">
          <Menu.Item>One</Menu.Item>
          <Menu.Item>Two</Menu.Item>
          <Menu.Item>Three</Menu.Item>
        </Menu>,
        "when clicking on the trigger",
        "to have rendered menu",
        `<div>
          <div class="menu fixed_width" role="menu">
            <div>
              <div role="menuitem">One</div>
              <div role="menuitem">Two</div>
              <div role="menuitem">Three</div>
            </div>
          </div>
        </div>
        `
      ));
  });

  describe("with a small size", () => {
    it("renders a small menu", () =>
      expect(
        <Menu size="small" trigger={<Button>trigger</Button>} testId="my-menu">
          <Menu.Item>One</Menu.Item>
          <Menu.Item>Two</Menu.Item>
          <Menu.Item>Three</Menu.Item>
        </Menu>,
        "when clicking on the trigger",
        "to have rendered menu",
        `<div>
          <div class="menu size_small" role="menu">
            <div>
              <div role="menuitem">One</div>
              <div role="menuitem">Two</div>
              <div role="menuitem">Three</div>
            </div>
          </div>
        </div>
        `
      ));
  });

  describe("with a wide flag", () => {
    it("renders a wide menu", () =>
      expect(
        <Menu wide trigger={<Button>trigger</Button>} testId="my-menu">
          <Menu.Item>One</Menu.Item>
          <Menu.Item>Two</Menu.Item>
          <Menu.Item>Three</Menu.Item>
        </Menu>,
        "when clicking on the trigger",
        "to have rendered menu",
        `<div>
          <div class="menu wide" role="menu">
            <div>
              <div role="menuitem">One</div>
              <div role="menuitem">Two</div>
              <div role="menuitem">Three</div>
            </div>
          </div>
        </div>
        `
      ));
  });

  describe("visibility hooks", () => {
    it("onOpen is called when the menu is shown", () => {
      const onOpen = sinon.spy();

      return expect(
        <Menu trigger={<Button>trigger</Button>} onOpen={onOpen}>
          <Menu.Item>One</Menu.Item>
          <Menu.Item>Two</Menu.Item>
          <Menu.Item>Three</Menu.Item>
        </Menu>,
        "when clicking on the trigger",
        "to satisfy",
        () => {
          expect(onOpen, "was called once");
        }
      );
    });

    it("onClose is called when the menu is closed", () => {
      const onClose = sinon.spy();

      return expect(
        <Menu trigger={<Button>trigger</Button>} onClose={onClose}>
          <Menu.Item>One</Menu.Item>
          <Menu.Item>Two</Menu.Item>
          <Menu.Item>Three</Menu.Item>
        </Menu>,
        "when deeply rendered",
        "with event",
        "click",
        "on",
        <Button>trigger</Button>,
        "with event",
        "click",
        "on",
        <Button>trigger</Button>
      ).then(() => {
        expect(onClose, "was called once");
      });
    });
  });

  // describe("with an onChange on the menu", () => {
  //   it("calls the onChange handler when an item is clicked", () => {
  //     const onChange = sinon.spy();

  //     return expect(
  //       <Menu onChange={onChange} trigger={<Button>trigger</Button>} testId="my-menu">
  //         <Menu.Item value="one">One</Menu.Item>
  //         <Menu.Item value="two">Two</Menu.Item>
  //         <Menu.Item value="three">Three</Menu.Item>
  //       </Menu>,
  //       "when clicking on the trigger"
  //     ).then(() => {
  //       // console.log(document.body.innerHTML);
  //       return expect(
  //         document.body,
  //         "queried for", "div .item"
  //       ).then(menuItems => {
  //         console.log(menuItems[0]);
  //         // return;
  //         // console.log(menuItem.innerHTML);
  //         return expect(
  //           menuItems[0],
  //           "with event",
  //           "mouseDown"
  //         ).then(() => {
  //           return expect(onChange, "to have calls satisfying", () => {
  //             onChange("two", { type: "mousedown" });
  //           });
  //         });
  //       });
  //     });
  //   });
  // });

  // describe("with an onClick handle on the individual items", () => {
  //   it("calls the onClick handler when the item is clicked", () => {
  //     const onClick = sinon.spy();

  //     return expect(
  //       <Menu trigger={<Button>trigger</Button>}>
  //         <Menu.Item onClick={onClick} value="one">
  //           One
  //         </Menu.Item>
  //         <Menu.Item onClick={onClick} value="two">
  //           Two
  //         </Menu.Item>
  //         <Menu.Item onClick={onClick} value="three">
  //           Three
  //         </Menu.Item>
  //       </Menu>,
  //       "when deeply rendered",
  //       "with event",
  //       "click",
  //       "on",
  //       <Button>trigger</Button>,
  //       "with event",
  //       "mouseDown",
  //       "on",
  //       <Menu.Item>One</Menu.Item>
  //     ).then(() => {
  //       expect(onClick, "to have calls satisfying", () => {
  //         onClick("one", { type: "mousedown" });
  //       });
  //     });
  //   });

  //   it("calls the onClick handler when the item is selected with the keyboard", () => {
  //     const onClick = sinon.spy();

  //     return expect(
  //       <Menu trigger={<Button>trigger</Button>}>
  //         <Menu.Item onClick={onClick} value="one">
  //           One
  //         </Menu.Item>
  //         <Menu.Item onClick={onClick} value="two">
  //           Two
  //         </Menu.Item>
  //         <Menu.Item onClick={onClick} value="three">
  //           Three
  //         </Menu.Item>
  //       </Menu>,
  //       "when deeply rendered",
  //       "with event",
  //       "click",
  //       "on",
  //       <Button>trigger</Button>,
  //       "with event",
  //       "keyDown",
  //       { keyCode: 40 },
  //       "on",
  //       <Button>trigger</Button>,
  //       "with event",
  //       "keyDown",
  //       { keyCode: 40 },
  //       "on",
  //       <Button>trigger</Button>,
  //       "with event",
  //       "keyDown",
  //       { keyCode: 13 },
  //       "on",
  //       <Button>trigger</Button>
  //     ).then(() => {
  //       expect(onClick, "to have calls satisfying", () => {
  //         onClick("two", { type: "keydown" });
  //       });
  //     });
  //   });
  // });

  // describe("containing link items", () => {
  //   const menu = (
  //     <Menu trigger={<Button>trigger</Button>}>
  //       <Menu.LinkItem href="https://www.zendesk.com">Link</Menu.LinkItem>
  //       <Menu.LinkItem
  //         href="https://www.zendesk.com/help-center"
  //         target="_blank"
  //       >
  //         Blank
  //       </Menu.LinkItem>
  //       <Menu.LinkItem href="https://www.zendesk.com/support" disabled>
  //         Disabled
  //       </Menu.LinkItem>
  //     </Menu>
  //   );

  //   beforeEach(() => {
  //     sinon.stub(window, "open").returns({
  //       opener: "evil opener"
  //     });
  //   });

  //   afterEach(() => {
  //     window.open.restore();
  //   });

  //   it("opens the link when you click on a link item", () => {
  //     return expect(
  //       menu,
  //       "when deeply rendered",
  //       "with event",
  //       "click",
  //       "on",
  //       <Button>trigger</Button>,
  //       "with event",
  //       "mouseDown",
  //       "on",
  //       <Menu.LinkItem>Link</Menu.LinkItem>
  //     ).then(() => {
  //       expect(window.open, "to have calls satisfying", () => {
  //         window.open("https://www.zendesk.com", "_self");
  //       });
  //     });
  //   });

  //   it("ctrl clicking a link item sets the target to blank", () => {
  //     return expect(
  //       menu,
  //       "when deeply rendered",
  //       "with event",
  //       "click",
  //       "on",
  //       <Button>trigger</Button>,
  //       "with event",
  //       "mouseDown",
  //       { ctrlKey: true },
  //       "on",
  //       <Menu.LinkItem>Link</Menu.LinkItem>
  //     ).then(() => {
  //       expect(window.open, "to have calls satisfying", () => {
  //         window.open("https://www.zendesk.com", "_blank");
  //       });
  //     });
  //   });

  //   it("respects the link target", () => {
  //     return expect(
  //       menu,
  //       "when deeply rendered",
  //       "with event",
  //       "click",
  //       "on",
  //       <Button>trigger</Button>,
  //       "with event",
  //       "mouseDown",
  //       "on",
  //       <Menu.LinkItem target="_blank">Blank</Menu.LinkItem>
  //     ).then(() => {
  //       expect(window.open, "to have calls satisfying", () => {
  //         window.open("https://www.zendesk.com/help-center", "_blank");
  //       });
  //     });
  //   });

  //   it("respects the disabled flag", () => {
  //     return expect(
  //       menu,
  //       "when deeply rendered",
  //       "with event",
  //       "click",
  //       "on",
  //       <Button>trigger</Button>,
  //       "with event",
  //       "mouseDown",
  //       "on",
  //       <Menu.LinkItem disabled>Disabled</Menu.LinkItem>
  //     ).then(() => {
  //       expect(window.open, "was not called");
  //     });
  //   });

  //   it("opens the link when selected with the keyboard", () => {
  //     return expect(
  //       menu,
  //       "when deeply rendered",
  //       "with event",
  //       "click",
  //       "on",
  //       <Button>trigger</Button>,
  //       "with event",
  //       "keyDown",
  //       { keyCode: 40 },
  //       "on",
  //       <Button>trigger</Button>,
  //       "with event",
  //       "keyDown",
  //       { keyCode: 40 },
  //       "on",
  //       <Button>trigger</Button>,
  //       "with event",
  //       "keyDown",
  //       { keyCode: 13 },
  //       "on",
  //       <Button>trigger</Button>
  //     ).then(() => {
  //       expect(window.open, "to have calls satisfying", () => {
  //         window.open("https://www.zendesk.com/help-center", "_blank");
  //       });
  //     });
  //   });

  //   it("opens the link in a new window when a link is selected by ctrl-enter", () => {
  //     return expect(
  //       menu,
  //       "when deeply rendered",
  //       "with event",
  //       "click",
  //       "on",
  //       <Button>trigger</Button>,
  //       "with event",
  //       "keyDown",
  //       { keyCode: 40 },
  //       "on",
  //       <Button>trigger</Button>,
  //       "with event",
  //       "keyDown",
  //       { keyCode: 13, ctrlKey: true },
  //       "on",
  //       <Button>trigger</Button>
  //     ).then(() => {
  //       expect(window.open, "to have calls satisfying", () => {
  //         window.open("https://www.zendesk.com", "_blank");
  //       });
  //     });
  //   });
  // });
});
