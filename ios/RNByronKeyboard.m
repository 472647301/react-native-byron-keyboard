
#import "RNByronKeyboard.h"
#import <React/RCTUIManager.h>
#import <React/RCTBaseTextInputView.h>

@implementation RNByronKeyboard

@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE(RNByronKeyboard)

RCT_EXPORT_METHOD(install:(nonnull NSNumber *)reactTag height:(nonnull NSNumber *)height)
{
    UIView* inputView = [[RCTRootView alloc] initWithBridge:_bridge moduleName:@"RNByronKeyboard" initialProperties:@{@"tag": reactTag}];
    
    inputView.autoresizingMask = UIViewAutoresizingNone;
    inputView.frame = CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, height);
    // inputView.backgroundColor = [UIColor colorWithRed:0 green:0 blue:0 alpha:0.02];
    UITextField *view = (UITextField *)(((RCTBaseTextInputView*)[_bridge.uiManager viewForReactTag:reactTag]).backedTextInputView);
    
    view.inputView = inputView;
    [view reloadInputViews];
}

RCT_EXPORT_METHOD(uninstall:(nonnull NSNumber *)reactTag)
{
    UITextField *view = (UITextField *)(((RCTBaseTextInputView*)[_bridge.uiManager viewForReactTag:reactTag]).backedTextInputView);
    
    view.inputView = nil;
    [view reloadInputViews];
}

RCT_EXPORT_METHOD(insertText:(nonnull NSNumber *)reactTag withText:(NSString*)text) {
    UITextField *view = (UITextField *)(((RCTBaseTextInputView*)[_bridge.uiManager viewForReactTag:reactTag]).backedTextInputView);
    
    [view replaceRange:view.selectedTextRange withText:text];
}

RCT_EXPORT_METHOD(backSpace:(nonnull NSNumber *)reactTag) {
    UITextField *view = (UITextField *)(((RCTBaseTextInputView*)[_bridge.uiManager viewForReactTag:reactTag]).backedTextInputView);
    
    UITextRange* range = view.selectedTextRange;
    if ([view comparePosition:range.start toPosition:range.end] == 0) {
        range = [view textRangeFromPosition:[view positionFromPosition:range.start offset:-1] toPosition:range.start];
    }
    [view replaceRange:range withText:@""];
}

@end
  