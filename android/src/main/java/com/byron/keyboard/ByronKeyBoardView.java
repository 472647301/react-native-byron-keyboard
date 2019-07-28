package com.byron.keyboard;

import android.content.Context;
import android.view.MotionEvent;

import com.facebook.react.ReactRootView;

/**
 * Created by hfmoney on 2017/4/27.
 */

public class ByronKeyBoardView extends ReactRootView {
    public ByronKeyBoardView(Context context) {
        super(context);
    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        float y = ev.getY();
        final float scale = getContext().getResources().getDisplayMetrics().density;
        float boundY = 54 * scale;
        if (y < boundY) {
            return false;
        }
        return super.onTouchEvent(ev);
    }
}
