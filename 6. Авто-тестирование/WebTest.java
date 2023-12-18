import abstraction.BaseTest;
import org.junit.Assert;
import pages.MainPage;
import org.junit.Test;

public class WebTest extends BaseTest {

    private final String BASE_URL = "https://nsk.dostaevsky.ru/";
    private final String SEARCH_STRING = "Ролл филадельфия";
    private final int EXPECTED_CART_ITEMS_COUNT = 4;
    private final String CATEGORY_NAME = "Соусы";

    @Test
    public void containsCorrectCountTest() {
        var cartItemsCount = new MainPage(BASE_URL)
                .search(SEARCH_STRING)
                .pressCartButtonById(0)
                .openItemCardByIndex(1)
                .pressCartButton()
                .returnToMainPage()
                .goToCategoryByName(CATEGORY_NAME)
                .pressCartButtonById(2)
                .openItemCardByIndex(1)
                .pressCartButton()
                .returnToMainPage()
                .goToCartPage()
                .getCartItemsCount();
        Assert.assertEquals(EXPECTED_CART_ITEMS_COUNT, cartItemsCount);
    }

    @Test
    public void notEnoughProductsTest()
    {
        var canCheckout = new MainPage(BASE_URL)
                .goToCategoryByName(CATEGORY_NAME)
                .pressCartButtonById(0)
                .returnToMainPage()
                .goToCartPage()
                .canCheckout();
        Assert.assertFalse(canCheckout);
    }

    @Test
    public void enoughProductsTest()
    {
        var canCheckout = new MainPage(BASE_URL)
                .search(SEARCH_STRING)
                .pressCartButtonById(0)
                .pressCartButtonById(1)
                .pressCartButtonById(2)
                .returnToMainPage()
                .goToCartPage()
                .canCheckout();
        Assert.assertTrue(canCheckout);
    }
}
