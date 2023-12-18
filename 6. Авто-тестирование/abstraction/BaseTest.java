package abstraction;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.Selenide;
import org.junit.After;
import org.junit.Before;

public abstract class BaseTest {

    public void setUp() {
        Configuration.browser = "edge";
        Configuration.browserSize = "1920x1080";
        Configuration.holdBrowserOpen = true;
        Configuration.headless = false;
    }

    @Before
    public void init() {
        setUp();
    }


    @After
    public void tearDown() {
        Selenide.closeWebDriver();
    }
}
