# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.

# Keep WebView JavaScript interface
-keepclassmembers class com.socrtwo.filerepair.MainActivity$WebAppInterface {
    public *;
}

# Keep WebView classes
-keep class android.webkit.** { *; }

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface class
-keepclassmembers class fqcn.of.javascript.interface.for.webview {
   public *;
}
