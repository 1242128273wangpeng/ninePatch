package su.rusfearuth.reactnative.native9patch;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.lang.ref.WeakReference;
import java.util.HashMap;

public class RCTImageCache {
    private volatile static RCTImageCache sInstance = null;
    private HashMap<String, WeakReference<Integer>> mCache;

    public static RCTImageCache getInstance() {
        if (sInstance == null) {
            synchronized (RCTImageCache.class) {
                if (sInstance == null) {
                    sInstance = new RCTImageCache();
                }
            }
        }

        return sInstance;
    }

    private RCTImageCache() {
        mCache = new HashMap<>();
    }

    public void put(@NonNull final String key, @NonNull Integer drawableId) {
        mCache.put(key, new WeakReference<>(drawableId));
    }

    public @Nullable Integer get(@NonNull final String key) {
        WeakReference<Integer> ref = mCache.get(key);
        return ref == null ? null : ref.get();
    }

    public boolean has(@NonNull final String key) {
        return mCache.containsKey(key) && get(key) != null;
    }

    public void remove(@NonNull final String key) {
        mCache.remove(key);
    }
}
