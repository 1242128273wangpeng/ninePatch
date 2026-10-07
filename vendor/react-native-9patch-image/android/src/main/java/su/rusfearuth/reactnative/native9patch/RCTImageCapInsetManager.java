package su.rusfearuth.reactnative.native9patch;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

@ReactModule(name = RCTImageCapInsetManager.REACT_CLASS)
public class RCTImageCapInsetManager extends SimpleViewManager<RCTImageCapInsetView> {
    public static final String REACT_CLASS = "RCTImageCapInset";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected RCTImageCapInsetView createViewInstance(ThemedReactContext reactContext) {
        return new RCTImageCapInsetView(reactContext);
    }

    @ReactProp(name = "source")
    public void setSource(final RCTImageCapInsetView view, @Nullable ReadableMap source) {
        if (source == null || !source.hasKey("uri")) {
            view.setSource(null);
            return;
        }
        view.setSource(source.getString("uri"));
    }
}
